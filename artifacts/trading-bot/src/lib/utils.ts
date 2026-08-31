import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function formatNumber(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function getSessionStatusColor(status: string) {
  switch (status) {
    case 'scanning': return 'bg-info text-info-foreground border-info';
    case 'trading': return 'bg-success text-success-foreground border-success';
    case 'profit_locked': return 'bg-warning text-warning-foreground border-warning';
    case 'loss_locked': return 'bg-destructive text-destructive-foreground border-destructive';
    case 'closed': case 'idle': return 'bg-muted text-muted-foreground border-muted-foreground/20';
    case 'starting': return 'bg-primary text-primary-foreground border-primary';
    case 'failed': return 'bg-destructive text-destructive-foreground border-destructive';
    default: return 'bg-secondary text-secondary-foreground border-border';
  }
}

export function getPnlColor(value: number) {
  if (value > 0) return 'text-success';
  if (value < 0) return 'text-destructive';
  return 'text-muted-foreground';
}

export function getPnlBgColor(value: number) {
  if (value > 0) return 'bg-success/10 text-success';
  if (value < 0) return 'bg-destructive/10 text-destructive';
  return 'bg-muted text-muted-foreground';
}
