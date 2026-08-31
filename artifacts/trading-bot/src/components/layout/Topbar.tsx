import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetTodaySession, useStopSession } from "@workspace/api-client-react";
import { AlertOctagon, Power } from "lucide-react";
import { getSessionStatusColor } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { getGetTodaySessionQueryKey, getGetDashboardQueryKey } from "@workspace/api-client-react";

export function Topbar() {
  const { data: session } = useGetTodaySession();
  const stopSession = useStopSession();
  const queryClient = useQueryClient();

  const handleStop = () => {
    if (confirm("EMERGENCY STOP: Are you sure you want to close all active positions and halt trading?")) {
      stopSession.mutate(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetTodaySessionQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetDashboardQueryKey() });
        }
      });
    }
  };

  return (
    <header className="min-h-14 bg-background border-b flex items-center justify-between gap-2 px-3 py-2 shadow-sm z-10 sticky top-0 md:px-6">
      <div className="flex min-w-0 items-center gap-2 md:gap-4">
        <h1 className="truncate text-base font-semibold tracking-tight md:text-lg">Mission Control</h1>
        {session?.mode === "paper" && (
          <Badge variant="warning" className="shrink-0 animate-pulse px-1.5 text-[10px] md:px-2 md:text-xs">
            PAPER MODE
          </Badge>
        )}
        {session?.mode === "live" && (
          <Badge variant="destructive">
            LIVE MONEY
          </Badge>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2 md:gap-4">
        {session && (
          <Badge variant="custom" className={`hidden sm:inline-flex ${getSessionStatusColor(session.status)}`}>
            {session.status.replace("_", " ")}
          </Badge>
        )}
        
        <Button
          variant="destructive"
          size="sm"
          className="px-2 font-bold tracking-wider md:px-3"
          onClick={handleStop}
          disabled={!session || session.status === "closed" || session.status === "idle" || stopSession.isPending}
        >
          {stopSession.isPending ? (
             <Power className="mr-1 h-4 w-4 animate-spin sm:mr-2" />
          ) : (
             <AlertOctagon className="mr-1 h-4 w-4 sm:mr-2" />
          )}
          <span className="hidden sm:inline">EMERGENCY STOP</span>
          <span className="sm:hidden">STOP</span>
        </Button>
      </div>
    </header>
  );
}
