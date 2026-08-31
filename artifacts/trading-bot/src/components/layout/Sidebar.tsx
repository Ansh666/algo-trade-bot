import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Activity,
  BarChart2,
  Crosshair,
  List,
  Wallet,
  Settings,
  ShieldAlert,
  Terminal,
} from "lucide-react";
import { useGetTodaySession } from "@workspace/api-client-react";

export function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/positions", label: "Positions", icon: Activity },
    { href: "/trades", label: "Trade History", icon: BarChart2 },
    { href: "/signals", label: "Live Signals", icon: Crosshair },
    { href: "/instruments", label: "Stock Universe", icon: List },
    { href: "/orders", label: "Orders", icon: Terminal },
    { href: "/wallet", label: "Wallet", icon: Wallet },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const { data: session } = useGetTodaySession();

  return (
    <>
    <div className="hidden md:flex md:w-64 bg-sidebar text-sidebar-foreground flex-col h-full border-r border-sidebar-border shadow-xl z-10 relative">
      <div className="h-14 flex items-center px-4 border-b border-sidebar-border bg-sidebar-foreground/5">
        <ShieldAlert className="w-5 h-5 text-primary mr-2" />
        <span className="font-bold tracking-tight text-lg">ALGO<span className="text-primary opacity-80">TRADE</span></span>
      </div>

      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href} className="block">
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className={cn("w-4 h-4", isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/50")} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-sidebar-border bg-sidebar-foreground/5 text-xs text-sidebar-foreground/50 flex flex-col gap-1">
        <div className="flex justify-between">
          <span>System Status:</span>
          <span className="text-success font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse block" /> Online
          </span>
        </div>
        <div className="flex justify-between">
          <span>Mode:</span>
          <span className="font-medium text-sidebar-foreground">
            {session?.mode === "paper" ? "Paper Trading" : "Live Trading"}
          </span>
        </div>
      </div>
    </div>
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 flex h-16 items-center gap-1 overflow-x-auto border-t border-sidebar-border bg-sidebar px-2 text-sidebar-foreground shadow-2xl">
      {navItems.map((item) => {
        const isActive = location === item.href;
        return (
          <Link key={item.href} href={item.href} className="min-w-[64px] flex-1">
            <div
              className={cn(
                "flex h-12 flex-col items-center justify-center gap-1 rounded-md text-[10px] font-medium",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/65",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="max-w-[72px] truncate">{item.label}</span>
            </div>
          </Link>
        );
      })}
    </nav>
    </>
  );
}
