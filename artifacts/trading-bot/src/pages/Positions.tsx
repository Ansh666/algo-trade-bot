import { useListPositions, useForceClosePosition, getListPositionsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatPercent, getPnlColor, getPnlBgColor, cn } from "@/lib/utils";
import { ShieldAlert, Crosshair, TrendingUp, AlertTriangle, Target } from "lucide-react";

export default function Positions() {
  const { data: positions, isLoading } = useListPositions();
  const forceClose = useForceClosePosition();
  const queryClient = useQueryClient();

  const handleClose = (id: number) => {
    if (confirm("Are you sure you want to force close this position at market price?")) {
      forceClose.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListPositionsQueryKey() });
        }
      });
    }
  };

  const getStopStateLabel = (state: string) => {
    switch (state) {
      case 'initial_risk': return 'Initial Risk';
      case 'one_r_reached': return '1R Reached';
      case 'break_even': return 'Break Even';
      case 'trailing_active': return 'Trailing Active';
      case 'target_reached': return 'Target Reached';
      default: return state;
    }
  };

  const getStopStateColor = (state: string) => {
    switch (state) {
      case 'initial_risk': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'break_even': return 'bg-warning/10 text-warning border-warning/20';
      case 'trailing_active': return 'bg-info/10 text-info border-info/20';
      case 'target_reached': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoading) return <div className="animate-pulse">Loading positions...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Active Positions</h2>
        <p className="text-muted-foreground">Manage currently open trades and live P&L.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Entry / Current</TableHead>
                <TableHead className="text-right">Unrealized P&L</TableHead>
                <TableHead className="text-center">Stop State</TableHead>
                <TableHead className="text-right">SL / Target</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!positions || positions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                    No active positions.
                  </TableCell>
                </TableRow>
              ) : (
                positions.map((pos) => (
                  <TableRow key={pos.id} className="group">
                    <TableCell className="font-bold text-base">{pos.symbol}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="uppercase text-[10px]">
                        {pos.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{pos.quantity}</TableCell>
                    <TableCell className="text-right font-mono">
                      <div className="text-muted-foreground text-xs">{formatCurrency(pos.entryPrice)}</div>
                      <div className="font-semibold">{formatCurrency(pos.currentPrice)}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className={cn("px-2 py-1 rounded inline-block", getPnlBgColor(pos.unrealizedPnl))}>
                        <div className="font-bold">{formatCurrency(pos.unrealizedPnl)}</div>
                        <div className="text-[10px] text-right">{formatPercent(pos.unrealizedPnlPercent)}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className={cn("text-xs px-2 py-1 rounded border", getStopStateColor(pos.stopState))}>
                        {getStopStateLabel(pos.stopState)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs">
                      <div className="flex items-center justify-end gap-1 text-destructive">
                        <ShieldAlert className="w-3 h-3" /> {formatCurrency(pos.stopLoss)}
                      </div>
                      <div className="flex items-center justify-end gap-1 text-success mt-1">
                        <Target className="w-3 h-3" /> {formatCurrency(pos.target)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleClose(pos.id)}
                        disabled={forceClose.isPending || pos.status === 'exit_submitted'}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        CLOSE
                      </Button>
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
