import { useListOrders } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Orders() {
  const { data: orders, isLoading } = useListOrders({ limit: 100 } as any);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete': return <Badge variant="success">Complete</Badge>;
      case 'rejected': case 'cancelled': return <Badge variant="destructive">{status}</Badge>;
      case 'open': case 'partially_filled': return <Badge variant="warning">{status.replace("_", " ")}</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) return <div className="animate-pulse">Loading orders...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Order Log</h2>
        <p className="text-muted-foreground">Raw broker order execution history.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Side</TableHead>
                <TableHead className="text-right">Req Qty</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Fill Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!orders || orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-32 text-center text-muted-foreground">
                    No orders today.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {format(new Date(order.createdAt), "HH:mm:ss")}
                    </TableCell>
                    <TableCell className="font-mono text-[10px] text-muted-foreground">
                      {order.brokerOrderId || `INT-${order.id}`}
                    </TableCell>
                    <TableCell className="font-bold">{order.symbol}</TableCell>
                    <TableCell>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">
                        {order.orderType.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={cn(
                        "text-xs font-bold uppercase", 
                        order.side === 'buy' ? 'text-success' : 'text-destructive'
                      )}>
                        {order.side}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono">{order.quantity}</TableCell>
                    <TableCell className="text-right font-mono text-xs">
                      {order.price ? formatCurrency(order.price) : 'MKT'}
                      {order.triggerPrice && <div className="text-muted-foreground mt-0.5">Trg: {formatCurrency(order.triggerPrice)}</div>}
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell className="text-right font-mono font-medium">
                      {order.filledPrice ? formatCurrency(order.filledPrice) : '-'}
                      {order.filledQuantity && <div className="text-muted-foreground text-[10px] mt-0.5">Qty: {order.filledQuantity}</div>}
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
