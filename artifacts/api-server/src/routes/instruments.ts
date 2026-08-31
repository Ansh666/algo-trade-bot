import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, instrumentsTable } from "@workspace/db";
import {
  ListInstrumentsResponse,
  GetInstrumentParams,
  GetInstrumentResponse,
} from "@workspace/api-zod";
import { normalizeApiData } from "../lib/api-serialize";

const router: IRouter = Router();

router.get("/instruments", async (req, res): Promise<void> => {
  const instruments = await db
    .select()
    .from(instrumentsTable)
    .where(eq(instrumentsTable.isActive, true))
    .orderBy(instrumentsTable.symbol);
  res.json(ListInstrumentsResponse.parse(normalizeApiData(instruments)));
});

router.get("/instruments/:id", async (req, res): Promise<void> => {
  const params = GetInstrumentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [instrument] = await db
    .select()
    .from(instrumentsTable)
    .where(eq(instrumentsTable.id, params.data.id));

  if (!instrument) {
    res.status(404).json({ error: "Instrument not found" });
    return;
  }

  res.json(GetInstrumentResponse.parse(normalizeApiData(instrument)));
});

export default router;
