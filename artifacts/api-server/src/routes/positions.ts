import { Router, type IRouter } from "express";
import { eq, inArray } from "drizzle-orm";
import { db, positionsTable } from "@workspace/db";
import {
  ListPositionsResponse,
  GetPositionParams,
  GetPositionResponse,
  ForceClosePositionParams,
  ForceClosePositionResponse,
} from "@workspace/api-zod";
import { normalizeApiData } from "../lib/api-serialize";

const router: IRouter = Router();

const ACTIVE_STATUSES = [
  "entry_submitted",
  "entry_filled",
  "stop_submitted",
  "protected",
  "trailing_active",
  "exit_submitted",
] as const;

router.get("/positions", async (req, res): Promise<void> => {
  const positions = await db
    .select()
    .from(positionsTable)
    .where(inArray(positionsTable.status, [...ACTIVE_STATUSES]));
  res.json(ListPositionsResponse.parse(normalizeApiData(positions)));
});

router.get("/positions/:id", async (req, res): Promise<void> => {
  const params = GetPositionParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [position] = await db
    .select()
    .from(positionsTable)
    .where(eq(positionsTable.id, params.data.id));

  if (!position) {
    res.status(404).json({ error: "Position not found" });
    return;
  }

  res.json(GetPositionResponse.parse(normalizeApiData(position)));
});

router.post("/positions/:id/close", async (req, res): Promise<void> => {
  const params = ForceClosePositionParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [position] = await db
    .select()
    .from(positionsTable)
    .where(eq(positionsTable.id, params.data.id));

  if (!position) {
    res.status(404).json({ error: "Position not found" });
    return;
  }

  const [updated] = await db
    .update(positionsTable)
    .set({ status: "closed", exitAt: new Date() })
    .where(eq(positionsTable.id, params.data.id))
    .returning();

  res.json(ForceClosePositionResponse.parse(normalizeApiData(updated)));
});

export default router;
