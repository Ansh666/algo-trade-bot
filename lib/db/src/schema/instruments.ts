import { pgTable, serial, text, boolean, numeric, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const instrumentsTable = pgTable("instruments", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull().unique(),
  name: text("name").notNull(),
  exchange: text("exchange").notNull().default("NSE"),
  isActive: boolean("is_active").notNull().default(true),
  // Live price (updated in memory; stored here for persistence)
  currentPrice: numeric("current_price", { precision: 12, scale: 4 }).notNull().default("0"),
  change: numeric("change", { precision: 12, scale: 4 }).notNull().default("0"),
  changePercent: numeric("change_percent", { precision: 8, scale: 4 }).notNull().default("0"),
  volume: integer("volume").notNull().default(0),
  relativeVolume: numeric("relative_volume", { precision: 8, scale: 4 }).notNull().default("0"),
  // Indicators
  vwap: numeric("vwap", { precision: 12, scale: 4 }),
  ema20: numeric("ema20", { precision: 12, scale: 4 }),
  ema50: numeric("ema50", { precision: 12, scale: 4 }),
  atr: numeric("atr", { precision: 12, scale: 4 }),
  score: integer("score"),
  // Support/Resistance zones
  supportZoneLow: numeric("support_zone_low", { precision: 12, scale: 4 }),
  supportZoneHigh: numeric("support_zone_high", { precision: 12, scale: 4 }),
  resistanceZoneLow: numeric("resistance_zone_low", { precision: 12, scale: 4 }),
  resistanceZoneHigh: numeric("resistance_zone_high", { precision: 12, scale: 4 }),
  prevDayHigh: numeric("prev_day_high", { precision: 12, scale: 4 }),
  prevDayLow: numeric("prev_day_low", { precision: 12, scale: 4 }),
  openingRangeHigh: numeric("opening_range_high", { precision: 12, scale: 4 }),
  openingRangeLow: numeric("opening_range_low", { precision: 12, scale: 4 }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertInstrumentSchema = createInsertSchema(instrumentsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertInstrument = z.infer<typeof insertInstrumentSchema>;
export type Instrument = typeof instrumentsTable.$inferSelect;
