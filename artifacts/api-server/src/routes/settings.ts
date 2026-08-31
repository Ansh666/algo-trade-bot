import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, tradingSettingsTable } from "@workspace/db";
import {
  GetSettingsResponse,
  UpdateSettingsBody,
  UpdateSettingsResponse,
} from "@workspace/api-zod";
import { eq } from "drizzle-orm";
import { normalizeApiData } from "../lib/api-serialize";

const router: IRouter = Router();

router.get("/settings", async (req, res): Promise<void> => {
  let [settings] = await db
    .select()
    .from(tradingSettingsTable)
    .orderBy(desc(tradingSettingsTable.id))
    .limit(1);

  if (!settings) {
    // Auto-create defaults
    [settings] = await db.insert(tradingSettingsTable).values({}).returning();
  }

  res.json(GetSettingsResponse.parse(normalizeApiData(settings)));
});

router.patch("/settings", async (req, res): Promise<void> => {
  const parsed = UpdateSettingsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  let [settings] = await db
    .select()
    .from(tradingSettingsTable)
    .orderBy(desc(tradingSettingsTable.id))
    .limit(1);

  if (!settings) {
    [settings] = await db.insert(tradingSettingsTable).values({}).returning();
  }

  const updates: Record<string, unknown> = {};
  const data = parsed.data;
  if (data.allocatedCapital != null) updates.allocatedCapital = data.allocatedCapital.toString();
  if (data.maxPositionValue != null) updates.maxPositionValue = data.maxPositionValue.toString();
  if (data.maxOpenPositions != null) updates.maxOpenPositions = data.maxOpenPositions;
  if (data.maxTradesPerDay != null) updates.maxTradesPerDay = data.maxTradesPerDay;
  if (data.riskPerTrade != null) updates.riskPerTrade = data.riskPerTrade.toString();
  if (data.dailyMaxLoss != null) updates.dailyMaxLoss = data.dailyMaxLoss.toString();
  if (data.dailyProfitCap != null) updates.dailyProfitCap = data.dailyProfitCap.toString();
  if (data.minRewardRiskRatio != null) updates.minRewardRiskRatio = data.minRewardRiskRatio.toString();
  if (data.autoTradingEnabled != null) updates.autoTradingEnabled = data.autoTradingEnabled;
  if (data.tradingMode != null) updates.tradingMode = data.tradingMode;

  const [updated] = await db
    .update(tradingSettingsTable)
    .set(updates)
    .where(eq(tradingSettingsTable.id, settings.id))
    .returning();

  res.json(UpdateSettingsResponse.parse(normalizeApiData(updated)));
});

export default router;
