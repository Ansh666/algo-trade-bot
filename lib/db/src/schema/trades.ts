import { pgTable, serial, integer, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { instrumentsTable } from "./instruments";

export const tradesTable = pgTable("trades", {
  id: serial("id").primaryKey(),
  instrumentId: integer("instrument_id").notNull().references(() => instrumentsTable.id),
  symbol: text("symbol").notNull(),
  positionId: integer("position_id"),
  sessionId: integer("session_id"),
  entryPrice: numeric("entry_price", { precision: 12, scale: 4 }).notNull(),
  exitPrice: numeric("exit_price", { precision: 12, scale: 4 }).notNull(),
  quantity: integer("quantity").notNull(),
  positionValue: numeric("position_value", { precision: 12, scale: 2 }).notNull(),
  pnl: numeric("pnl", { precision: 12, scale: 2 }).notNull(),
  pnlPercent: numeric("pnl_percent", { precision: 8, scale: 4 }).notNull(),
  exitReason: text("exit_reason", {
    enum: ["target", "stop_loss", "forced_close", "end_of_day", "daily_limit"],
  }).notNull(),
  durationSeconds: integer("duration_seconds").notNull(),
  entryAt: timestamp("entry_at", { withTimezone: true }).notNull(),
  exitAt: timestamp("exit_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertTradeSchema = createInsertSchema(tradesTable).omit({ id: true, createdAt: true });
export type InsertTrade = z.infer<typeof insertTradeSchema>;
export type Trade = typeof tradesTable.$inferSelect;
