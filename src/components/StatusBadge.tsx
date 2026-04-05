import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Verdict = "SAFE" | "SUSPICIOUS" | "DANGEROUS";
type Action = "ALLOW" | "WARN" | "FLAG" | "ESCALATE";

const verdictStyles: Record<Verdict, string> = {
  SAFE: "status-safe-subtle",
  SUSPICIOUS: "status-warning-subtle",
  DANGEROUS: "status-danger-subtle",
};

const actionStyles: Record<Action, string> = {
  ALLOW: "status-safe-subtle",
  WARN: "status-warning-subtle",
  FLAG: "status-warning-subtle",
  ESCALATE: "status-danger-subtle",
};

export function VerdictBadge({ verdict, className }: { verdict: Verdict; className?: string }) {
  return (
    <Badge className={cn("border-0 font-semibold text-[10px] rounded-md tracking-wide", verdictStyles[verdict], className)}>
      {verdict}
    </Badge>
  );
}

export function ActionBadge({ action, className }: { action: Action; className?: string }) {
  return (
    <Badge className={cn("border-0 font-semibold text-[10px] rounded-md tracking-wide", actionStyles[action], className)}>
      {action}
    </Badge>
  );
}
