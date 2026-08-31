import { useGetWallet, useListWalletLedger } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, getPnlColor } from "@/lib/utils";
import { format } from "date-fns";
import { Wallet as WalletIcon, ArrowDownToLine, ArrowUpFromLine, Lock, Unlock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Wallet() {
  const { data: wallet, isLoading: walletLoading } = useGetWallet();
  const { data: ledger, isLoading: ledgerLoading } = useListWalletLedger({ limit: 100 } as any);

  if (walletLoading || ledgerLoading) return <div className="animate-pulse">Loading wallet data...</div>;
  if (!wallet) return <div>Failed to load wallet.</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Virtual Wallet</h2>
        <p className="text-muted-foreground">Capital allocation and ledger tracking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-primary text-primary-foreground border-none">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-primary-foreground/70 text-sm font-semibold uppercase mb-2">
              <WalletIcon className="w-4 h-4" /> Allocated Capital
            </div>
            <div className="text-3xl font-bold font-mono tracking-tight">
              {formatCurrency(wallet.allocatedBalance)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold uppercase mb-2">
              <Unlock className="w-4 h-4" /> Available Margin
            </div>
            <div className="text-3xl font-bold font-mono tracking-tight text-info">
              {formatCurrency(wallet.availableBalance)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold uppercase mb-2">
              <Lock className="w-4 h-4" /> Reserved Margin
            </div>
            <div className="text-3xl font-bold font-mono tracking-tight text-warning">
              {formatCurrency(wallet.reservedBalance)}
            </div>
            <div className="text-xs text-muted-foreground mt-2">Locked in active positions</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold uppercase mb-2">
              Unsettled P&L
            </div>
            <div className={`text-3xl font-bold font-mono tracking-tight ${getPnlColor(wallet.realizedUnsettledPnl)}`}>
              {formatCurrency(wallet.realizedUnsettledPnl)}
            </div>
            <div className="text-xs text-muted-foreground mt-2">To be settled at EOD</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ledger Entries</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Running Bal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ledger?.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="text-xs text-muted-foreground">
                    {format(new Date(entry.createdAt), "MMM d, HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">
                      {entry.type.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{entry.description}</TableCell>
                  <TableCell className="text-right font-mono">
                    <span className={entry.amount > 0 ? "text-success" : entry.amount < 0 ? "text-destructive" : ""}>
                      {entry.amount > 0 ? "+" : ""}{formatCurrency(entry.amount)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold">
                    {formatCurrency(entry.runningBalance)}
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
