import { pgTable, serial, numeric, integer, boolean, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const tradingSettingsTable = pgTable("trading_settings", {
  id: serial("id").primaryKey(),
  allocatedCapital: numeric("allocated_capital", { precision: 12, scale: 2 }).notNull().default("10000"),
  maxPositionValue: numeric("max_position_value", { precision: 12, scale: 2 }).notNull().default("2000"),
  maxOpenPositions: integer("max_open_positions").notNull().default(3),
  maxTradesPerDay: integer("max_trades_per_day").notNull().default(5),
  riskPerTrade: numeric("risk_per_trade", { precision: 12, scale: 2 }).notNull().default("50"),
  dailyMaxLoss: numeric("daily_max_loss", { precision: 12, scale: 2 }).notNull().default("200"),
  dailyProfitCap: numeric("daily_profit_cap", { precision: 12, scale: 2 }).notNull().default("400"),
  minRewardRiskRatio: numeric("min_reward_risk_ratio", { precision: 4, scale: 2 }).notNull().default("2"),
  autoTradingEnabled: boolean("auto_trading_enabled").notNull().default(false),
  tradingMode: text("trading_mode", { enum: ["paper", "live"] }).notNull().default("paper"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertTradingSettingsSchema = createInsertSchema(tradingSettingsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertTradingSettings = z.infer<typeof insertTradingSettingsSchema>;
export type TradingSettings = typeof tradingSettingsTable.$inferSelect;
