import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Activity, Cpu } from "lucide-react";

type SystemStatus = "SECURE" | "WARNING" | "CRITICAL";

interface TopBarProps {
  status?: SystemStatus;
}

const statusStyles: Record<SystemStatus, string> = {
  SECURE: "status-safe",
  WARNING: "status-warning",
  CRITICAL: "status-danger",
};

export function TopBar({ status = "SECURE" }: TopBarProps) {
  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div className="h-5 w-px bg-border" />
        <div>
          <h2 className="text-sm font-semibold text-foreground leading-none">SafeCom</h2>
          <p className="text-[10px] text-muted-foreground">Real-Time Digital Safety Layer</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Cpu className="h-3.5 w-3.5" />
          <span className="font-mono">Groq Gemma 2 9B</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Activity className="h-3.5 w-3.5 text-safe animate-pulse-dot" />
          <span>Detection Active</span>
        </div>
        <Badge className={`${statusStyles[status]} text-[10px] font-semibold px-2.5 py-0.5 border-0`}>
          {status}
        </Badge>
      </div>
    </header>
  );
}
