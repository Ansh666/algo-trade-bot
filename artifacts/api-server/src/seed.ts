/**
 * Seed script — populates DB with realistic NSE Nifty 50 instruments,
 * sample trades, signals, positions, settings, and wallet ledger entries.
 */
import { db } from "@workspace/db";
import {
  instrumentsTable,
  tradingSettingsTable,
  tradingSessionsTable,
  signalsTable,
  positionsTable,
  tradesTable,
  ordersTable,
  walletLedgerTable,
} from "@workspace/db";

const NIFTY_STOCKS = [
  { symbol: "RELIANCE", name: "Reliance Industries Ltd", price: 2874.5, atr: 42.3 },
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3921.2, atr: 55.1 },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd", price: 1623.4, atr: 22.7 },
  { symbol: "INFY", name: "Infosys Ltd", price: 1842.6, atr: 28.9 },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd", price: 1234.8, atr: 18.4 },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", price: 1876.3, atr: 27.6 },
  { symbol: "LT", name: "Larsen & Toubro Ltd", price: 3456.9, atr: 51.2 },
  { symbol: "AXISBANK", name: "Axis Bank Ltd", price: 1134.5, atr: 16.9 },
  { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd", price: 7234.1, atr: 108.5 },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd", price: 1876.4, atr: 28.1 },
  { symbol: "SBIN", name: "State Bank of India", price: 821.3, atr: 12.3 },
  { symbol: "WIPRO", name: "Wipro Ltd", price: 498.7, atr: 7.5 },
  { symbol: "HCLTECH", name: "HCL Technologies Ltd", price: 1534.2, atr: 23.0 },
  { symbol: "ITC", name: "ITC Ltd", price: 467.8, atr: 7.0 },
  { symbol: "TATASTEEL", name: "Tata Steel Ltd", price: 156.4, atr: 2.3 },
  { symbol: "MARUTI", name: "Maruti Suzuki India", price: 12456.3, atr: 186.8 },
  { symbol: "SUNPHARMA", name: "Sun Pharmaceutical", price: 1876.5, atr: 28.1 },
  { symbol: "ONGC", name: "Oil & Natural Gas Corp", price: 276.4, atr: 4.1 },
  { symbol: "TITAN", name: "Titan Company Ltd", price: 3234.7, atr: 48.5 },
  { symbol: "NESTLEIND", name: "Nestle India Ltd", price: 2456.8, atr: 36.9 },
  { symbol: "POWERGRID", name: "Power Grid Corp", price: 312.6, atr: 4.7 },
  { symbol: "ULTRACEMCO", name: "UltraTech Cement", price: 9876.4, atr: 148.1 },
  { symbol: "ADANIENT", name: "Adani Enterprises", price: 2876.5, atr: 43.1 },
  { symbol: "JSWSTEEL", name: "JSW Steel Ltd", price: 934.2, atr: 14.0 },
  { symbol: "DRREDDY", name: "Dr. Reddy's Laboratories", price: 6234.8, atr: 93.5 },
];

async function seed() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await db.delete(walletLedgerTable);
  await db.delete(ordersTable);
  await db.delete(tradesTable);
  await db.delete(positionsTable);
  await db.delete(signalsTable);
  await db.delete(tradingSessionsTable);
  await db.delete(instrumentsTable);
  await db.delete(tradingSettingsTable);
  console.log("✓ Cleared existing data");

  // Seed settings
  const [settings] = await db
    .insert(tradingSettingsTable)
    .values({
      allocatedCapital: "50000",
      maxPositionValue: "5000",
      maxOpenPositions: 3,
      maxTradesPerDay: 5,
      riskPerTrade: "150",
      dailyMaxLoss: "500",
      dailyProfitCap: "1000",
      minRewardRiskRatio: "2",
      autoTradingEnabled: false,
      tradingMode: "paper",
    })
    .returning();
  console.log("✓ Settings seeded");

  // Seed instruments
  const now = new Date();
  const instrumentValues = NIFTY_STOCKS.map((s, i) => {
    const change = (Math.random() - 0.45) * s.atr * 0.8;
    const changePercent = (change / s.price) * 100;
    const volume = Math.floor(100000 + Math.random() * 2000000);
    const relVolume = 0.8 + Math.random() * 2.4;
    const score = Math.floor(40 + Math.random() * 55);
    const vwap = s.price + (Math.random() - 0.5) * s.atr * 0.3;
    const ema20 = s.price + (Math.random() - 0.5) * s.atr * 0.5;
    const ema50 = s.price + (Math.random() - 0.5) * s.atr;
    return {
      symbol: s.symbol,
      name: s.name,
      exchange: "NSE",
      isActive: true,
      currentPrice: s.price.toFixed(2),
      change: change.toFixed(2),
      changePercent: changePercent.toFixed(4),
      volume,
      relativeVolume: relVolume.toFixed(4),
      vwap: vwap.toFixed(2),
      ema20: ema20.toFixed(2),
      ema50: ema50.toFixed(2),
      atr: s.atr.toFixed(2),
      score,
      supportZoneLow: (s.price - s.atr * 2).toFixed(2),
      supportZoneHigh: (s.price - s.atr * 1.2).toFixed(2),
      resistanceZoneLow: (s.price + s.atr * 1.2).toFixed(2),
      resistanceZoneHigh: (s.price + s.atr * 2).toFixed(2),
      prevDayHigh: (s.price + s.atr * 0.6).toFixed(2),
      prevDayLow: (s.price - s.atr * 0.7).toFixed(2),
      openingRangeHigh: (s.price + s.atr * 0.2).toFixed(2),
      openingRangeLow: (s.price - s.atr * 0.2).toFixed(2),
      updatedAt: now,
    };
  });
  const instruments = await db.insert(instrumentsTable).values(instrumentValues).returning();
  console.log(`✓ Seeded ${instruments.length} instruments`);

  // Seed a session for today
  const today = now.toISOString().slice(0, 10);
  const sessionStart = new Date(now);
  sessionStart.setHours(9, 15, 0, 0);
  const [session] = await db
    .insert(tradingSessionsTable)
    .values({
      date: today,
      status: "scanning",
      mode: "paper",
      realizedPnl: "342.50",
      unrealizedPnl: "87.20",
      tradeCount: 3,
      winCount: 2,
      lossCount: 1,
      dailyLossLimit: "500",
      dailyProfitCap: "1000",
      allocatedCapital: "50000",
      startedAt: sessionStart,
    })
    .returning();
  console.log("✓ Session seeded");

  // Helper: pick 5 random instruments for signals/trades
  const shuffled = [...instruments].sort(() => Math.random() - 0.5);
  const signalInstruments = shuffled.slice(0, 5);
  const tradeInstruments = shuffled.slice(5, 10);
  const positionInstruments = shuffled.slice(10, 12);

  // Seed pending signals
  const signalValues = signalInstruments.map((inst) => {
    const entry = parseFloat(inst.currentPrice?.toString() ?? "0");
    const atr = parseFloat(inst.atr?.toString() ?? "5");
    const stop = entry - atr * 0.8;
    const target = entry + atr * 1.8;
    const risk = (entry - stop);
    const reward = (target - entry);
    return {
      instrumentId: inst.id,
      symbol: inst.symbol,
      strategy: (Math.random() > 0.5 ? "volume_breakout" : "support_pullback") as "volume_breakout" | "support_pullback",
      score: Math.floor(65 + Math.random() * 30),
      entryPrice: entry.toFixed(2),
      stopLoss: stop.toFixed(2),
      target: target.toFixed(2),
      riskAmount: (risk * 5).toFixed(2),
      rewardAmount: (reward * 5).toFixed(2),
      riskReward: (reward / risk).toFixed(2),
      status: "pending" as const,
    };
  });
  await db.insert(signalsTable).values(signalValues);
  console.log("✓ Signals seeded");

  // Seed completed trades (historical data over past 2 weeks)
  const tradeValues = [];
  for (let day = 14; day >= 1; day--) {
    const tradeDate = new Date(now);
    tradeDate.setDate(tradeDate.getDate() - day);
    if (tradeDate.getDay() === 0 || tradeDate.getDay() === 6) continue; // skip weekends

    const dayInstruments = tradeInstruments.slice(0, 2 + Math.floor(Math.random() * 3));
    for (const inst of dayInstruments) {
      const entryTime = new Date(tradeDate);
      entryTime.setHours(9, 30 + Math.floor(Math.random() * 90), 0, 0);
      const durationSec = 600 + Math.floor(Math.random() * 5400);
      const exitTime = new Date(entryTime.getTime() + durationSec * 1000);
      const entry = parseFloat(inst.currentPrice?.toString() ?? "0") * (0.97 + Math.random() * 0.06);
      const atr = parseFloat(inst.atr?.toString() ?? "5");
      const isWin = Math.random() > 0.38;
      const exitShift = isWin ? atr * (0.5 + Math.random() * 1.5) : -atr * (0.3 + Math.random() * 0.8);
      const exitPrice = entry + exitShift;
      const qty = Math.floor(500 / entry) + 1;
      const pnl = (exitPrice - entry) * qty;
      const pnlPct = ((exitPrice - entry) / entry) * 100;
      const exitReason = isWin
        ? "target"
        : Math.random() > 0.5
        ? "stop_loss"
        : "end_of_day";
      tradeValues.push({
        instrumentId: inst.id,
        symbol: inst.symbol,
        sessionId: session.id,
        entryPrice: entry.toFixed(4),
        exitPrice: exitPrice.toFixed(4),
        quantity: qty,
        positionValue: (entry * qty).toFixed(2),
        pnl: pnl.toFixed(2),
        pnlPercent: pnlPct.toFixed(4),
        exitReason: exitReason as "target" | "stop_loss" | "end_of_day",
        durationSeconds: durationSec,
        entryAt: entryTime,
        exitAt: exitTime,
      });
    }
  }
  if (tradeValues.length > 0) {
    await db.insert(tradesTable).values(tradeValues);
  }
  console.log(`✓ Seeded ${tradeValues.length} historical trades`);

  // Seed 2 active positions
  const posValues = positionInstruments.map((inst, i) => {
    const entry = parseFloat(inst.currentPrice?.toString() ?? "0") * 0.995;
    const atr = parseFloat(inst.atr?.toString() ?? "5");
    const current = entry + atr * (i === 0 ? 0.5 : -0.2);
    const stop = entry - atr * 0.8;
    const target = entry + atr * 1.8;
    const qty = Math.floor(1000 / entry) + 1;
    const unrealizedPnl = (current - entry) * qty;
    const entryTime = new Date(now);
    entryTime.setHours(10, 15 + i * 20, 0, 0);
    return {
      instrumentId: inst.id,
      symbol: inst.symbol,
      sessionId: session.id,
      entryPrice: entry.toFixed(4),
      currentPrice: current.toFixed(4),
      stopLoss: stop.toFixed(4),
      target: target.toFixed(4),
      quantity: qty,
      positionValue: (entry * qty).toFixed(2),
      unrealizedPnl: unrealizedPnl.toFixed(2),
      unrealizedPnlPercent: (((current - entry) / entry) * 100).toFixed(4),
      plannedRisk: (Math.abs(entry - stop) * qty).toFixed(2),
      plannedReward: (Math.abs(target - entry) * qty).toFixed(2),
      status: (i === 0 ? "protected" : "entry_filled") as "protected" | "entry_filled",
      stopState: (i === 0 ? "break_even" : "initial_risk") as "break_even" | "initial_risk",
      entryAt: entryTime,
    };
  });
  const positions = await db.insert(positionsTable).values(posValues).returning();
  console.log("✓ Positions seeded");

  // Seed wallet ledger
  const ledgerEntries = [
    { type: "allocation_created" as const, amount: "50000", description: "Initial capital allocation", runningBalance: "50000" },
    { type: "position_reserved" as const, amount: `-${parseFloat(posValues[0]?.positionValue ?? "0").toFixed(2)}`, description: `Reserved for ${positionInstruments[0]?.symbol} position`, runningBalance: (50000 - parseFloat(posValues[0]?.positionValue ?? "0")).toFixed(2) },
    { type: "profit_recorded" as const, amount: "342.50", description: "Realized P&L from today's closed trades", runningBalance: (50000 - parseFloat(posValues[0]?.positionValue ?? "0") + 342.50).toFixed(2) },
  ];
  await db.insert(walletLedgerTable).values(ledgerEntries);
  console.log("✓ Wallet ledger seeded");

  console.log("\n✅ Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
