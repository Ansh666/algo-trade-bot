import { useGetLiveSignals, useListSignals } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { ShieldAlert, Target } from "lucide-react";

export default function Signals() {
  const { data: liveSignals, isLoading: liveLoading } = useGetLiveSignals();
  const { data: historySignals, isLoading: historyLoading } = useListSignals({ limit: 50 } as any);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="warning">Evaluating</Badge>;
      case 'approved': return <Badge variant="info">Approved</Badge>;
      case 'executed': return <Badge variant="success">Executed</Badge>;
      case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
      case 'expired': return <Badge variant="outline">Expired</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (liveLoading || historyLoading) return <div className="animate-pulse">Scanning universe...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Live Signals</h2>
        <p className="text-muted-foreground">Algo-generated setups based on active strategies.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="border-primary/50 shadow-md">
          <div className="px-4 py-3 border-b bg-primary/5 flex items-center justify-between">
            <h3 className="font-semibold text-primary uppercase tracking-wider text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Active Evaluation Queue
            </h3>
          </div>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Strategy</TableHead>
                  <TableHead className="w-[150px]">Confidence</TableHead>
                  <TableHead className="text-right">Risk/Reward</TableHead>
                  <TableHead className="text-right">Setup Levels</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!liveSignals || liveSignals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      No active signals forming right now.
                    </TableCell>
                  </TableRow>
                ) : (
                  liveSignals.map((signal) => (
                    <TableRow key={signal.id}>
                      <TableCell className="font-bold text-lg">{signal.symbol}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-[10px]">
                          {signal.strategy.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm w-6">{signal.score}</span>
                          <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                            <div className="bg-primary h-full transition-all duration-500" style={{ width: `${signal.score}%` }} />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono font-medium">
                        1:{signal.riskReward.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs">
                        <div className="font-bold mb-1">Entry: {formatCurrency(signal.entryPrice)}</div>
                        <div className="text-destructive flex items-center justify-end gap-1"><ShieldAlert className="w-3 h-3"/> SL: {formatCurrency(signal.stopLoss)}</div>
                        <div className="text-success flex items-center justify-end gap-1"><Target className="w-3 h-3"/> TGT: {formatCurrency(signal.target)}</div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-lg font-bold mb-3">Signal History</h3>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historySignals?.map((signal) => (
                    <TableRow key={signal.id}>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(signal.createdAt), "HH:mm:ss")}
                      </TableCell>
                      <TableCell className="font-bold">{signal.symbol}</TableCell>
                      <TableCell className="font-mono text-xs">{signal.score}/100</TableCell>
                      <TableCell>{getStatusBadge(signal.status)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate" title={signal.rejectionReason || ""}>
                        {signal.rejectionReason || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
