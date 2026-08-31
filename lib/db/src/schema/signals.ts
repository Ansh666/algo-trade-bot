import { pgTable, serial, integer, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { instrumentsTable } from "./instruments";

export const signalsTable = pgTable("signals", {
  id: serial("id").primaryKey(),
  instrumentId: integer("instrument_id").notNull().references(() => instrumentsTable.id),
  symbol: text("symbol").notNull(),
  strategy: text("strategy", { enum: ["volume_breakout", "support_pullback"] }).notNull(),
  score: integer("score").notNull(),
  entryPrice: numeric("entry_price", { precision: 12, scale: 4 }).notNull(),
  stopLoss: numeric("stop_loss", { precision: 12, scale: 4 }).notNull(),
  target: numeric("target", { precision: 12, scale: 4 }).notNull(),
  riskAmount: numeric("risk_amount", { precision: 12, scale: 2 }).notNull(),
  rewardAmount: numeric("reward_amount", { precision: 12, scale: 2 }).notNull(),
  riskReward: numeric("risk_reward", { precision: 6, scale: 2 }).notNull(),
  status: text("status", {
    enum: ["pending", "approved", "rejected", "executed", "expired"],
  }).notNull().default("pending"),
  rejectionReason: text("rejection_reason"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertSignalSchema = createInsertSchema(signalsTable).omit({ id: true, createdAt: true });
export type InsertSignal = z.infer<typeof insertSignalSchema>;
export type Signal = typeof signalsTable.$inferSelect;
