import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, walletLedgerTable, tradingSettingsTable, positionsTable, tradingSessionsTable } from "@workspace/db";
import { inArray, eq, gte } from "drizzle-orm";
import {
  GetWalletResponse,
  ListWalletLedgerQueryParams,
  ListWalletLedgerResponse,
} from "@workspace/api-zod";
import { normalizeApiData } from "../lib/api-serialize";

const router: IRouter = Router();

function todayStart(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

router.get("/wallet", async (req, res): Promise<void> => {
  const [settings] = await db
    .select()
    .from(tradingSettingsTable)
    .orderBy(desc(tradingSettingsTable.id))
    .limit(1);

  const allocatedBalance = parseFloat(settings?.allocatedCapital?.toString() ?? "10000");

  // Get active positions to compute reserved and unrealized
  const activePositions = await db
    .select()
    .from(positionsTable)
    .where(
      inArray(positionsTable.status, [
        "entry_submitted",
        "entry_filled",
        "stop_submitted",
        "protected",
        "trailing_active",
        "exit_submitted",
      ])
    );

  const reservedBalance = activePositions.reduce(
    (sum, p) => sum + parseFloat(p.positionValue?.toString() ?? "0"),
    0
  );
  const unrealizedPnl = activePositions.reduce(
    (sum, p) => sum + parseFloat(p.unrealizedPnl?.toString() ?? "0"),
    0
  );

  // Get today's session for daily PnL
  const today = new Date().toISOString().slice(0, 10);
  const [session] = await db
    .select()
    .from(tradingSessionsTable)
    .where(eq(tradingSessionsTable.date, today))
    .orderBy(desc(tradingSessionsTable.id))
    .limit(1);

  const realizedUnsettledPnl = parseFloat(session?.realizedPnl?.toString() ?? "0");
  const settledBalance = allocatedBalance;
  const availableBalance = allocatedBalance - reservedBalance;
  const withdrawableBalance = Math.max(0, realizedUnsettledPnl);
  const dailyPnl = realizedUnsettledPnl + unrealizedPnl;
  const dailyPnlPercent = allocatedBalance > 0 ? (dailyPnl / allocatedBalance) * 100 : 0;

  const wallet = {
    allocatedBalance,
    availableBalance,
    reservedBalance,
    unrealizedPnl,
    realizedUnsettledPnl,
    settledBalance,
    withdrawableBalance,
    dailyPnl,
    dailyPnlPercent,
  };

  res.json(GetWalletResponse.parse(normalizeApiData(wallet)));
});

router.get("/wallet/ledger", async (req, res): Promise<void> => {
  const params = ListWalletLedgerQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const limit = params.data.limit ?? 50;

  const entries = await db
    .select()
    .from(walletLedgerTable)
    .orderBy(desc(walletLedgerTable.createdAt))
    .limit(limit);

  res.json(ListWalletLedgerResponse.parse(normalizeApiData(entries)));
});

export default router;
