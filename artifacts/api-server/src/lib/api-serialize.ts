const NUMERIC_FIELDS = new Set([
  "allocatedCapital",
  "availableBalance",
  "reservedBalance",
  "realizedPnl",
  "unrealizedPnl",
  "realizedUnsettledPnl",
  "settledBalance",
  "withdrawableBalance",
  "dailyPnl",
  "dailyPnlPercent",
  "dailyLossLimit",
  "dailyMaxLoss",
  "dailyProfitCap",
  "currentPrice",
  "change",
  "changePercent",
  "relativeVolume",
  "vwap",
  "ema20",
  "ema50",
  "atr",
  "supportZoneLow",
  "supportZoneHigh",
  "resistanceZoneLow",
  "resistanceZoneHigh",
  "prevDayHigh",
  "prevDayLow",
  "openingRangeHigh",
  "openingRangeLow",
  "entryPrice",
  "exitPrice",
  "stopLoss",
  "target",
  "riskAmount",
  "rewardAmount",
  "riskReward",
  "positionValue",
  "unrealizedPnlPercent",
  "plannedRisk",
  "plannedReward",
  "price",
  "triggerPrice",
  "filledPrice",
  "pnl",
  "pnlPercent",
  "amount",
  "runningBalance",
  "maxPositionValue",
  "riskPerTrade",
  "minRewardRiskRatio",
  "avgWin",
  "avgLoss",
  "profitFactor",
  "totalPnl",
  "bestTrade",
  "worstTrade",
  "maxDrawdown",
]);

/**
 * Drizzle returns PostgreSQL numeric columns as strings by default.
 * The public API contract exposes those fields as JSON numbers.
 */
export function normalizeApiData<T>(value: T, key?: string): T {
  if (typeof value === "string" && key && NUMERIC_FIELDS.has(key)) {
    return Number(value) as T;
  }

  if (value instanceof Date) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeApiData(item)) as T;
  }

  if (value && typeof value === "object") {
    const normalized = Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([entryKey, entryValue]) => [
        entryKey,
        normalizeApiData(entryValue, entryKey),
      ]),
    );
    return normalized as T;
  }

  return value;
}