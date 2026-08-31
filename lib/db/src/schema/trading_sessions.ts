import { pgTable, serial, text, numeric, integer, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const tradingSessionsTable = pgTable("trading_sessions", {
  id: serial("id").primaryKey(),
  date: date("date", { mode: "string" }).notNull(),
  status: text("status", {
    enum: ["idle", "starting", "scanning", "trading", "profit_locked", "loss_locked", "closing", "closed", "failed"],
  }).notNull().default("idle"),
  mode: text("mode", { enum: ["paper", "live"] }).notNull().default("paper"),
  realizedPnl: numeric("realized_pnl", { precision: 12, scale: 2 }).notNull().default("0"),
  unrealizedPnl: numeric("unrealized_pnl", { precision: 12, scale: 2 }).notNull().default("0"),
  tradeCount: integer("trade_count").notNull().default(0),
  winCount: integer("win_count").notNull().default(0),
  lossCount: integer("loss_count").notNull().default(0),
  dailyLossLimit: numeric("daily_loss_limit", { precision: 12, scale: 2 }).notNull().default("200"),
  dailyProfitCap: numeric("daily_profit_cap", { precision: 12, scale: 2 }).notNull().default("400"),
  allocatedCapital: numeric("allocated_capital", { precision: 12, scale: 2 }).notNull().default("10000"),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  stoppedAt: timestamp("stopped_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertTradingSessionSchema = createInsertSchema(tradingSessionsTable).omit({ id: true, createdAt: true });
export type InsertTradingSession = z.infer<typeof insertTradingSessionSchema>;
export type TradingSession = typeof tradingSessionsTable.$inferSelect;
