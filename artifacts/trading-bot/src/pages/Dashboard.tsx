import { useGetDashboard, useStartSession, useStopSession } from "@workspace/api-client-react";
import { getGetDashboardQueryKey, getGetTodaySessionQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatPercent, getSessionStatusColor, getPnlColor, getPnlBgColor, cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, ArrowRightLeft, Target, TrendingDown, TrendingUp, AlertTriangle, Crosshair } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { data: dashboard, isLoading } = useGetDashboard();
  const startSession = useStartSession();
  const queryClient = useQueryClient();

  const handleStart = () => {
    startSession.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetDashboardQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetTodaySessionQueryKey() });
      }
    });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-full text-muted-foreground animate-pulse">Loading mission control...</div>;
  }

  if (!dashboard) {
    return <div className="text-destructive font-mono p-4">Error loading dashboard data. Check connection.</div>;
  }

  const { session, wallet, activePositionsCount, pendingSignalsCount, topSignals, recentTrades } = dashboard;
  const isSessionIdle = session.status === 'idle' || session.status === 'closed' || session.status === 'failed';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Session Status */}
        <Card className="border-l-4 border-l-primary shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center">
              Session
              <Badge variant="custom" className={getSessionStatusColor(session.status)}>
                {session.status.replace("_", " ")}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mode</span>
                <span className="font-bold">{session.mode.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Trades Today</span>
                <span className="font-bold">{session.tradeCount}</span>
              </div>
              <div className="pt-2">
                {isSessionIdle ? (
                  <Button onClick={handleStart} disabled={startSession.isPending} className="w-full">
                    {startSession.isPending ? "STARTING..." : "START SESSION"}
                  </Button>
                ) : (
                  <div className="h-9 flex items-center justify-center bg-muted/50 rounded-md text-xs font-medium text-muted-foreground">
                    ALGO IS ACTIVE
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily P&L */}
        <Card className="border-l-4 border-l-info shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Today's P&L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="text-3xl font-mono tracking-tight font-bold">
                <span className={getPnlColor(wallet.dailyPnl)}>
                  {formatCurrency(wallet.dailyPnl)}
                </span>
              </div>
              <div className="text-sm font-medium mt-1">
                <span className={getPnlColor(wallet.dailyPnlPercent)}>
                  {formatPercent(wallet.dailyPnlPercent)}
                </span>
                <span className="text-muted-foreground ml-2">on allocated</span>
              </div>
              
              <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t">
                <span className="text-muted-foreground">Limits</span>
                <span className="font-mono">
                  <span className="text-destructive">-{formatCurrency(session.dailyLossLimit)}</span> / <span className="text-success">+{formatCurrency(session.dailyProfitCap)}</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Positions */}
        <Card className="border-l-4 border-l-warning shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Active Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-3xl font-bold font-mono">{activePositionsCount}</span>
                <span className="text-xs text-muted-foreground uppercase font-semibold mt-1">Positions</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold font-mono">{pendingSignalsCount}</span>
                <span className="text-xs text-muted-foreground uppercase font-semibold mt-1">Signals pending</span>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/positions" className="text-xs text-primary font-medium hover:underline flex items-center">
                View Positions <ArrowRightLeft className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Win/Loss */}
        <Card className="border-l-4 border-l-success shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-3xl font-bold font-mono text-success">{session.winCount}</span>
                <span className="text-xs text-muted-foreground uppercase font-semibold mt-1">Wins</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold font-mono text-destructive">{session.lossCount}</span>
                <span className="text-xs text-muted-foreground uppercase font-semibold mt-1">Losses</span>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-4 overflow-hidden flex">
              <div 
                className="bg-success h-full" 
                style={{ width: session.tradeCount > 0 ? `${(session.winCount / session.tradeCount) * 100}%` : '0%' }} 
              />
              <div 
                className="bg-destructive h-full" 
                style={{ width: session.tradeCount > 0 ? `${(session.lossCount / session.tradeCount) * 100}%` : '0%' }} 
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Signals */}
        <Card className="shadow-sm flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between py-3">
            <CardTitle className="flex items-center gap-2">
              <Crosshair className="w-4 h-4" /> Top Live Signals
            </CardTitle>
            <Link href="/signals" className="text-xs text-primary hover:underline">View All</Link>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Strategy</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Risk:Reward</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSignals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">No active signals.</TableCell>
                  </TableRow>
                ) : (
                  topSignals.map((signal) => (
                    <TableRow key={signal.id}>
                      <TableCell className="font-bold">{signal.symbol}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{signal.strategy.replace("_", " ")}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs">{signal.score}</span>
                          <div className="w-16 bg-muted rounded-full h-1.5 overflow-hidden">
                            <div className="bg-primary h-full" style={{ width: `${signal.score}%` }} />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs">
                        1:{signal.riskReward.toFixed(1)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Trades */}
        <Card className="shadow-sm flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between py-3">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-4 h-4" /> Recent Trades
            </CardTitle>
            <Link href="/trades" className="text-xs text-primary hover:underline">View History</Link>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>P&L</TableHead>
                  <TableHead>Exit</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTrades.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">No completed trades today.</TableCell>
                  </TableRow>
                ) : (
                  recentTrades.slice(0, 5).map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell className="font-bold">{trade.symbol}</TableCell>
                      <TableCell>
                        <span className={cn("px-2 py-0.5 rounded text-xs font-bold", getPnlBgColor(trade.pnl))}>
                          {formatCurrency(trade.pnl)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">
                          {trade.exitReason.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">
                        {Math.floor(trade.durationSeconds / 60)}m {trade.durationSeconds % 60}s
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
