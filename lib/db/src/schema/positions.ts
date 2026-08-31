import { pgTable, serial, integer, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { instrumentsTable } from "./instruments";

export const positionsTable = pgTable("positions", {
  id: serial("id").primaryKey(),
  instrumentId: integer("instrument_id").notNull().references(() => instrumentsTable.id),
  symbol: text("symbol").notNull(),
  entryPrice: numeric("entry_price", { precision: 12, scale: 4 }).notNull(),
  currentPrice: numeric("current_price", { precision: 12, scale: 4 }).notNull(),
  stopLoss: numeric("stop_loss", { precision: 12, scale: 4 }).notNull(),
  target: numeric("target", { precision: 12, scale: 4 }).notNull(),
  quantity: integer("quantity").notNull(),
  positionValue: numeric("position_value", { precision: 12, scale: 2 }).notNull(),
  unrealizedPnl: numeric("unrealized_pnl", { precision: 12, scale: 2 }).notNull().default("0"),
  unrealizedPnlPercent: numeric("unrealized_pnl_percent", { precision: 8, scale: 4 }).notNull().default("0"),
  plannedRisk: numeric("planned_risk", { precision: 12, scale: 2 }).notNull(),
  plannedReward: numeric("planned_reward", { precision: 12, scale: 2 }).notNull(),
  status: text("status", {
    enum: ["entry_submitted", "entry_filled", "stop_submitted", "protected", "trailing_active", "exit_submitted", "closed", "failed"],
  }).notNull().default("entry_submitted"),
  stopState: text("stop_state", {
    enum: ["initial_risk", "one_r_reached", "break_even", "trailing_active", "target_reached"],
  }).notNull().default("initial_risk"),
  entryOrderId: integer("entry_order_id"),
  stopOrderId: integer("stop_order_id"),
  sessionId: integer("session_id"),
  entryAt: timestamp("entry_at", { withTimezone: true }).notNull().defaultNow(),
  exitAt: timestamp("exit_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPositionSchema = createInsertSchema(positionsTable).omit({ id: true, createdAt: true });
export type InsertPosition = z.infer<typeof insertPositionSchema>;
export type Position = typeof positionsTable.$inferSelect;
