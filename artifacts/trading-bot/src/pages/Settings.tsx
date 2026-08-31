import { useGetSettings, useUpdateSettings, getGetSettingsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Save } from "lucide-react";
import { useEffect, useRef } from "react";

const formSchema = z.object({
  allocatedCapital: z.coerce.number().min(10000, "Minimum capital is 10,000"),
  maxPositionValue: z.coerce.number().min(1000),
  maxOpenPositions: z.coerce.number().min(1).max(10),
  maxTradesPerDay: z.coerce.number().min(1).max(50),
  riskPerTrade: z.coerce.number().min(100),
  dailyMaxLoss: z.coerce.number().min(500),
  dailyProfitCap: z.coerce.number().min(1000),
  minRewardRiskRatio: z.coerce.number().min(1).step(0.1),
  autoTradingEnabled: z.boolean(),
  tradingMode: z.enum(["paper", "live"])
});

export default function Settings() {
  const { data: settings, isLoading } = useGetSettings();
  const updateSettings = useUpdateSettings();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allocatedCapital: 100000,
      maxPositionValue: 25000,
      maxOpenPositions: 3,
      maxTradesPerDay: 10,
      riskPerTrade: 500,
      dailyMaxLoss: 2000,
      dailyProfitCap: 5000,
      minRewardRiskRatio: 2.0,
      autoTradingEnabled: false,
      tradingMode: "paper"
    }
  });

  const initializedId = useRef<number | null>(null);

  useEffect(() => {
    if (settings && initializedId.current !== settings.id) {
      initializedId.current = settings.id;
      form.reset(settings);
    }
  }, [settings, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.tradingMode === "live" && settings?.tradingMode === "paper") {
      if (!confirm("WARNING: Switching to LIVE mode means real money will be traded. Proceed?")) {
        form.setValue("tradingMode", "paper");
        return;
      }
    }

    updateSettings.mutate({ data: values }, {
      onSuccess: () => {
        toast({ title: "Settings updated successfully" });
        queryClient.invalidateQueries({ queryKey: getGetSettingsQueryKey() });
      },
      onError: (err: any) => {
        toast({ title: "Failed to update settings", variant: "destructive" });
      }
    });
  };

  if (isLoading) return <div className="animate-pulse">Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Trading Mandate</h2>
        <p className="text-muted-foreground">Configure risk limits, position sizing, and modes.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          <Card className="border-destructive/30">
            <CardHeader className="bg-destructive/5 pb-4">
              <CardTitle className="text-destructive flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Master Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="tradingMode"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-muted/20">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Trading Mode</FormLabel>
                      <FormDescription>
                        {field.value === "live" ? 
                          <span className="text-destructive font-bold">LIVE MONEY ACTIVE</span> : 
                          <span className="text-warning font-bold">PAPER TRADING ONLY</span>}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value === "live"}
                        onCheckedChange={(checked) => field.onChange(checked ? "live" : "paper")}
                        className={field.value === "live" ? "bg-destructive" : ""}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="autoTradingEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-muted/20">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Auto-Execution</FormLabel>
                      <FormDescription>
                        Allow bot to place orders without manual approval.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Capital & Sizing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="allocatedCapital"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allocated Capital (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} className="font-mono" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxPositionValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Position Value (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} className="font-mono" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxOpenPositions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Open Positions</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} className="font-mono" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="riskPerTrade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Risk Per Trade (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} className="font-mono" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dailyMaxLoss"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily Max Loss (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} className="font-mono text-destructive" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dailyProfitCap"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily Profit Cap (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} className="font-mono text-success" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <FormField
                    control={form.control}
                    name="maxTradesPerDay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Trades / Day</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} className="font-mono" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="minRewardRiskRatio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min R:R Ratio</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} className="font-mono" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={updateSettings.isPending} className="w-full md:w-auto font-bold tracking-wide">
              {updateSettings.isPending ? "SAVING..." : <><Save className="w-4 h-4 mr-2"/> SAVE MANDATE</>}
            </Button>
          </div>

        </form>
      </Form>
    </div>
  );
}
