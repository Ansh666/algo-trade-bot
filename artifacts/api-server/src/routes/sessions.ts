import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, tradingSessionsTable, tradingSettingsTable } from "@workspace/db";
import {
  GetTodaySessionResponse,
  StartSessionResponse,
  StopSessionResponse,
} from "@workspace/api-zod";
import { normalizeApiData } from "../lib/api-serialize";

const router: IRouter = Router();

function todayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

router.get("/sessions/today", async (req, res): Promise<void> => {
  const today = todayDateString();
  const [session] = await db
    .select()
    .from(tradingSessionsTable)
    .where(eq(tradingSessionsTable.date, today))
    .orderBy(desc(tradingSessionsTable.id))
    .limit(1);

  if (!session) {
    res.status(404).json({ error: "No session for today" });
    return;
  }
  res.json(GetTodaySessionResponse.parse(normalizeApiData(session)));
});

router.post("/sessions/start", async (req, res): Promise<void> => {
  const today = todayDateString();

  // Check for existing active session
  const [existing] = await db
    .select()
    .from(tradingSessionsTable)
    .where(eq(tradingSessionsTable.date, today))
    .limit(1);

  if (existing && !["closed", "failed"].includes(existing.status)) {
    res.status(400).json({ error: "A session is already active today" });
    return;
  }

  // Load current settings for limits
  const [settings] = await db
    .select()
    .from(tradingSettingsTable)
    .orderBy(desc(tradingSettingsTable.id))
    .limit(1);

  const [session] = await db
    .insert(tradingSessionsTable)
    .values({
      date: today,
      status: "scanning",
      mode: settings?.tradingMode ?? "paper",
      dailyLossLimit: settings?.dailyMaxLoss ?? "200",
      dailyProfitCap: settings?.dailyProfitCap ?? "400",
      allocatedCapital: settings?.allocatedCapital ?? "10000",
      startedAt: new Date(),
    })
    .returning();

  res.status(201).json(StartSessionResponse.parse(normalizeApiData(session)));
});

router.post("/sessions/stop", async (req, res): Promise<void> => {
  const today = todayDateString();
  const [session] = await db
    .select()
    .from(tradingSessionsTable)
    .where(eq(tradingSessionsTable.date, today))
    .orderBy(desc(tradingSessionsTable.id))
    .limit(1);

  if (!session) {
    res.status(404).json({ error: "No active session to stop" });
    return;
  }

  const [updated] = await db
    .update(tradingSessionsTable)
    .set({ status: "closed", stoppedAt: new Date() })
    .where(eq(tradingSessionsTable.id, session.id))
    .returning();

  res.json(StopSessionResponse.parse(normalizeApiData(updated)));
});

export default router;
