import { Router, type IRouter } from "express";
import { eq, desc, and, gte } from "drizzle-orm";
import { db, signalsTable } from "@workspace/db";
import {
  ListSignalsQueryParams,
  ListSignalsResponse,
  GetLiveSignalsResponse,
} from "@workspace/api-zod";
import { normalizeApiData } from "../lib/api-serialize";

const router: IRouter = Router();

function todayStart(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

router.get("/signals/live", async (req, res): Promise<void> => {
  const signals = await db
    .select()
    .from(signalsTable)
    .where(
      and(
        eq(signalsTable.status, "pending"),
        gte(signalsTable.createdAt, todayStart())
      )
    )
    .orderBy(desc(signalsTable.score))
    .limit(10);
  res.json(GetLiveSignalsResponse.parse(normalizeApiData(signals)));
});

router.get("/signals", async (req, res): Promise<void> => {
  const params = ListSignalsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const conditions = [gte(signalsTable.createdAt, todayStart())];
  if (params.data.status) {
    conditions.push(eq(signalsTable.status, params.data.status));
  }

  const signals = await db
    .select()
    .from(signalsTable)
    .where(and(...conditions))
    .orderBy(desc(signalsTable.createdAt))
    .limit(100);

  res.json(ListSignalsResponse.parse(normalizeApiData(signals)));
});

export default router;
