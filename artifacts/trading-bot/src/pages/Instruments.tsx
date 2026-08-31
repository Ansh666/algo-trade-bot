import { useListInstruments } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";

export default function Instruments() {
  const { data: instruments, isLoading } = useListInstruments();

  if (isLoading) return <div className="animate-pulse">Loading stock universe...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Stock Universe</h2>
        <p className="text-muted-foreground">The 20-25 highly liquid stocks actively tracked by the algo.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">% Change</TableHead>
                <TableHead className="text-right">Rel. Vol</TableHead>
                <TableHead className="text-right text-xs">EMA 20/50</TableHead>
                <TableHead className="text-center">Algo Score</TableHead>
                <TableHead className="text-center">State</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instruments?.map((inst) => (
                <TableRow key={inst.id}>
                  <TableCell>
                    <div className="font-bold text-base">{inst.symbol}</div>
                    <div className="text-xs text-muted-foreground">{inst.name}</div>
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold">
                    {formatCurrency(inst.currentPrice)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    <span className={inst.changePercent >= 0 ? "text-success" : "text-destructive"}>
                      {formatPercent(inst.changePercent)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    <span className={cn(inst.relativeVolume > 1.5 && "text-info font-bold")}>
                      {inst.relativeVolume.toFixed(2)}x
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono text-[10px] text-muted-foreground space-y-1">
                    <div>{inst.ema20 ? formatCurrency(inst.ema20) : '-'}</div>
                    <div>{inst.ema50 ? formatCurrency(inst.ema50) : '-'}</div>
                  </TableCell>
                  <TableCell className="text-center">
                    {inst.score ? (
                      <span className={cn(
                        "inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs",
                        inst.score > 70 ? "bg-success/20 text-success" : 
                        inst.score > 40 ? "bg-warning/20 text-warning" : "bg-muted text-muted-foreground"
                      )}>
                        {inst.score}
                      </span>
                    ) : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {inst.isActive ? (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-success">
                        <Activity className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">Paused</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
