import { pgTable, serial, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const walletLedgerTable = pgTable("wallet_ledger", {
  id: serial("id").primaryKey(),
  type: text("type", {
    enum: ["allocation_created", "position_reserved", "position_released", "profit_recorded", "loss_recorded", "profit_settled", "withdrawal_recorded"],
  }).notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  description: text("description").notNull(),
  runningBalance: numeric("running_balance", { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertWalletLedgerSchema = createInsertSchema(walletLedgerTable).omit({ id: true, createdAt: true });
export type InsertWalletLedger = z.infer<typeof insertWalletLedgerSchema>;
export type WalletLedger = typeof walletLedgerTable.$inferSelect;
