import { Router, type IRouter } from "express";
import { desc, gte, inArray, eq, and } from "drizzle-orm";
import { db, tradingSessionsTable, tradingSettingsTable, positionsTable, signalsTable, tradesTable } from "@workspace/db";
import {
  GetDashboardResponse,
  GetPerformanceQueryParams,
  GetPerformanceResponse,
} from "@workspace/api-zod";
import { normalizeApiData } from "../lib/api-serialize";

const router: IRouter = Router();

function todayStart(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

const ACTIVE_POSITION_STATUSES = [
  "entry_submitted",
  "entry_filled",
  "stop_submitted",
  "protected",
  "trailing_active",
  "exit_submitted",
] as const;

router.get("/dashboard", async (req, res): Promise<void> => {
  const today = new Date().toISOString().slice(0, 10);

  // Run all queries in parallel
  const [sessionResult, settingsResult, activePositions, pendingSignals, todaySignals, todayTrades, recentTrades] =
    await Promise.all([
      db.select().from(tradingSessionsTable).where(eq(tradingSessionsTable.date, today)).orderBy(desc(tradingSessionsTable.id)).limit(1),
      db.select().from(tradingSettingsTable).orderBy(desc(tradingSettingsTable.id)).limit(1),
      db.select().from(positionsTable).where(inArray(positionsTable.status, [...ACTIVE_POSITION_STATUSES])),
      db.select().from(signalsTable).where(and(eq(signalsTable.status, "pending"), gte(signalsTable.createdAt, todayStart()))),
      db.select().from(signalsTable).where(and(eq(signalsTable.status, "pending"), gte(signalsTable.createdAt, todayStart()))).orderBy(desc(signalsTable.score)).limit(5),
      db.select().from(tradesTable).where(gte(tradesTable.exitAt, todayStart())),
      db.select().from(tradesTable).orderBy(desc(tradesTable.exitAt)).limit(5),
    ]);

  const settings = settingsResult[0];
  const allocatedCapital = parseFloat(settings?.allocatedCapital?.toString() ?? "10000");

  // Build or derive a session object
  let session = sessionResult[0];
  if (!session) {
    // Return a default idle session
    const now = new Date();
    session = {
      id: 0,
      date: today,
      status: "idle" as const,
      mode: (settings?.tradingMode as "paper" | "live") ?? "paper",
      realizedPnl: "0",
      unrealizedPnl: "0",
      tradeCount: 0,
      winCount: 0,
      lossCount: 0,
      dailyLossLimit: settings?.dailyMaxLoss ?? "200",
      dailyProfitCap: settings?.dailyProfitCap ?? "400",
      allocatedCapital: settings?.allocatedCapital ?? "10000",
      startedAt: now,
      stoppedAt: null,
      createdAt: now,
    };
  }

  const reservedBalance = activePositions.reduce((sum, p) => sum + parseFloat(p.positionValue?.toString() ?? "0"), 0);
  const unrealizedPnl = activePositions.reduce((sum, p) => sum + parseFloat(p.unrealizedPnl?.toString() ?? "0"), 0);
  const realizedUnsettledPnl = parseFloat(session.realizedPnl?.toString() ?? "0");
  const dailyPnl = realizedUnsettledPnl + unrealizedPnl;

  const wallet = {
    allocatedBalance: allocatedCapital,
    availableBalance: allocatedCapital - reservedBalance,
    reservedBalance,
    unrealizedPnl,
    realizedUnsettledPnl,
    settledBalance: allocatedCapital,
    withdrawableBalance: Math.max(0, realizedUnsettledPnl),
    dailyPnl,
    dailyPnlPercent: allocatedCapital > 0 ? (dailyPnl / allocatedCapital) * 100 : 0,
  };

  const todayWins = todayTrades.filter((t) => parseFloat(t.pnl.toString()) > 0).length;
  const todayLosses = todayTrades.filter((t) => parseFloat(t.pnl.toString()) <= 0).length;

  const dashboard = {
    session,
    wallet,
    activePositionsCount: activePositions.length,
    pendingSignalsCount: pendingSignals.length,
    todayTradeCount: todayTrades.length,
    todayWinCount: todayWins,
    todayLossCount: todayLosses,
    topSignals: todaySignals,
    recentTrades,
  };

  res.json(GetDashboardResponse.parse(normalizeApiData(dashboard)));
});

router.get("/dashboard/performance", async (req, res): Promise<void> => {
  const params = GetPerformanceQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const days = params.data.days ?? 30;
  const since = new Date();
  since.setDate(since.getDate() - days);
  since.setHours(0, 0, 0, 0);

  const trades = await db
    .select()
    .from(tradesTable)
    .where(gte(tradesTable.exitAt, since));

  const totalTrades = trades.length;
  const wins = trades.filter((t) => parseFloat(t.pnl.toString()) > 0);
  const losses = trades.filter((t) => parseFloat(t.pnl.toString()) <= 0);
  const winCount = wins.length;
  const lossCount = losses.length;
  const winRate = totalTrades > 0 ? (winCount / totalTrades) * 100 : 0;
  const avgWin = winCount > 0 ? wins.reduce((s, t) => s + parseFloat(t.pnl.toString()), 0) / winCount : 0;
  const avgLoss = lossCount > 0 ? Math.abs(losses.reduce((s, t) => s + parseFloat(t.pnl.toString()), 0) / lossCount) : 0;
  const totalProfit = wins.reduce((s, t) => s + parseFloat(t.pnl.toString()), 0);
  const totalLoss = Math.abs(losses.reduce((s, t) => s + parseFloat(t.pnl.toString()), 0));
  const profitFactor = totalLoss > 0 ? totalProfit / totalLoss : totalProfit > 0 ? 999 : 0;
  const totalPnl = trades.reduce((s, t) => s + parseFloat(t.pnl.toString()), 0);
  const pnls = trades.map((t) => parseFloat(t.pnl.toString()));
  const bestTrade = pnls.length > 0 ? Math.max(...pnls) : 0;
  const worstTrade = pnls.length > 0 ? Math.min(...pnls) : 0;
  const avgDurationSeconds = totalTrades > 0 ? Math.round(trades.reduce((s, t) => s + t.durationSeconds, 0) / totalTrades) : 0;

  // Simple max drawdown: running peak minus current
  let peak = 0;
  let runningPnl = 0;
  let maxDrawdown = 0;
  for (const t of trades) {
    runningPnl += parseFloat(t.pnl.toString());
    if (runningPnl > peak) peak = runningPnl;
    const drawdown = peak - runningPnl;
    if (drawdown > maxDrawdown) maxDrawdown = drawdown;
  }

  // Unique trading days
  const tradingDaySet = new Set(trades.map((t) => t.exitAt.toISOString().slice(0, 10)));

  const stats = {
    totalTrades,
    winCount,
    lossCount,
    winRate,
    avgWin,
    avgLoss,
    profitFactor,
    totalPnl,
    bestTrade,
    worstTrade,
    maxDrawdown,
    avgDurationSeconds,
    tradingDays: tradingDaySet.size,
  };

  res.json(GetPerformanceResponse.parse(normalizeApiData(stats)));
});

export default router;
