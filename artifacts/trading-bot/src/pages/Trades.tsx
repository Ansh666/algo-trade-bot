import { useListTrades } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatPercent, getPnlBgColor } from "@/lib/utils";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Trades() {
  const { data: trades, isLoading } = useListTrades({ limit: 100 });

  const getExitReasonBadge = (reason: string) => {
    switch (reason) {
      case 'target': return <Badge variant="success">Target Hit</Badge>;
      case 'stop_loss': return <Badge variant="destructive">Stop Loss</Badge>;
      case 'forced_close': return <Badge variant="warning">Forced Close</Badge>;
      case 'daily_limit': return <Badge variant="destructive">Daily Limit</Badge>;
      case 'end_of_day': return <Badge variant="outline">EOD Square-off</Badge>;
      default: return <Badge variant="outline">{reason}</Badge>;
    }
  };

  if (isLoading) return <div className="animate-pulse">Loading trade history...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Trade History</h2>
        <p className="text-muted-foreground">Log of all completed trades.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Entry / Exit</TableHead>
                <TableHead>Exit Reason</TableHead>
                <TableHead className="text-right">Net P&L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!trades || trades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    No completed trades.
                  </TableCell>
                </TableRow>
              ) : (
                trades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {format(new Date(trade.entryAt), "MMM d, HH:mm")} <br/>
                      {format(new Date(trade.exitAt), "HH:mm")}
                    </TableCell>
                    <TableCell className="font-bold">{trade.symbol}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {Math.floor(trade.durationSeconds / 60)}m {trade.durationSeconds % 60}s
                    </TableCell>
                    <TableCell className="text-right">{trade.quantity}</TableCell>
                    <TableCell className="text-right font-mono text-xs">
                      <div>{formatCurrency(trade.entryPrice)}</div>
                      <div className="font-semibold">{formatCurrency(trade.exitPrice)}</div>
                    </TableCell>
                    <TableCell>
                      {getExitReasonBadge(trade.exitReason)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className={cn("px-2 py-1 rounded inline-flex flex-col items-end", getPnlBgColor(trade.pnl))}>
                        <span className="font-bold">{formatCurrency(trade.pnl)}</span>
                        <span className="text-[10px]">{formatPercent(trade.pnlPercent)}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
