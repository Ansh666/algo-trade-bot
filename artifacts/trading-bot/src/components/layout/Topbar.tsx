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
    <header className="h-14 bg-background border-b flex items-center justify-between px-6 shadow-sm z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg tracking-tight">Mission Control</h1>
        {session?.mode === "paper" && (
          <Badge variant="warning" className="animate-pulse">
            PAPER MODE
          </Badge>
        )}
        {session?.mode === "live" && (
          <Badge variant="destructive">
            LIVE MONEY
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-4">
        {session && (
          <Badge variant="custom" className={getSessionStatusColor(session.status)}>
            {session.status.replace("_", " ")}
          </Badge>
        )}
        
        <Button
          variant="destructive"
          size="sm"
          className="font-bold tracking-wider"
          onClick={handleStop}
          disabled={!session || session.status === "closed" || session.status === "idle" || stopSession.isPending}
        >
          {stopSession.isPending ? (
             <Power className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <AlertOctagon className="w-4 h-4 mr-2" />
          )}
          EMERGENCY STOP
        </Button>
      </div>
    </header>
  );
}
