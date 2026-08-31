import { Router, type IRouter } from "express";
import { eq, desc, gte } from "drizzle-orm";
import { db, tradesTable } from "@workspace/db";
import {
  ListTradesQueryParams,
  ListTradesResponse,
  ListTodayTradesResponse,
  GetTradeParams,
  GetTradeResponse,
} from "@workspace/api-zod";
import { normalizeApiData } from "../lib/api-serialize";

const router: IRouter = Router();

function todayStart(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

router.get("/trades/today", async (req, res): Promise<void> => {
  const trades = await db
    .select()
    .from(tradesTable)
    .where(gte(tradesTable.exitAt, todayStart()))
    .orderBy(desc(tradesTable.exitAt));
  res.json(ListTodayTradesResponse.parse(normalizeApiData(trades)));
});

router.get("/trades", async (req, res): Promise<void> => {
  const params = ListTradesQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const limit = params.data.limit ?? 50;
  const trades = await db
    .select()
    .from(tradesTable)
    .orderBy(desc(tradesTable.exitAt))
    .limit(limit);
  res.json(ListTradesResponse.parse(normalizeApiData(trades)));
});

router.get("/trades/:id", async (req, res): Promise<void> => {
  const params = GetTradeParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [trade] = await db
    .select()
    .from(tradesTable)
    .where(eq(tradesTable.id, params.data.id));

  if (!trade) {
    res.status(404).json({ error: "Trade not found" });
    return;
  }

  res.json(GetTradeResponse.parse(normalizeApiData(trade)));
});

export default router;
