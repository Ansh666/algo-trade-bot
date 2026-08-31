import { pgTable, serial, integer, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { instrumentsTable } from "./instruments";

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  instrumentId: integer("instrument_id").notNull().references(() => instrumentsTable.id),
  symbol: text("symbol").notNull(),
  positionId: integer("position_id"),
  orderType: text("order_type", { enum: ["market", "limit", "sl", "sl_market"] }).notNull(),
  side: text("side", { enum: ["buy", "sell"] }).notNull(),
  quantity: integer("quantity").notNull(),
  price: numeric("price", { precision: 12, scale: 4 }).notNull(),
  triggerPrice: numeric("trigger_price", { precision: 12, scale: 4 }),
  filledPrice: numeric("filled_price", { precision: 12, scale: 4 }),
  filledQuantity: integer("filled_quantity"),
  status: text("status", {
    enum: ["pending", "open", "partially_filled", "complete", "rejected", "cancelled"],
  }).notNull().default("pending"),
  brokerOrderId: text("broker_order_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof ordersTable.$inferSelect;
