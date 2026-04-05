import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { VerdictBadge, ActionBadge } from "@/components/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const logs = [
  { id: "SIG-001", time: "2024-12-15 12:04:32", level: "DANGEROUS" as const, action: "ESCALATE" as const, agents: "Threat(0.94) + Context(0.88)", preview: "I will find you and make you regret this" },
  { id: "SIG-002", time: "2024-12-15 12:03:18", level: "SUSPICIOUS" as const, action: "FLAG" as const, agents: "Context(0.74)", preview: "You better watch your back" },
  { id: "SIG-003", time: "2024-12-15 12:01:44", level: "SUSPICIOUS" as const, action: "WARN" as const, agents: "Context(0.61)", preview: "If you don't do what I say..." },
  { id: "SIG-004", time: "2024-12-15 11:58:21", level: "SAFE" as const, action: "ALLOW" as const, agents: "All clear", preview: "Can we reschedule to 3pm?" },
  { id: "SIG-005", time: "2024-12-15 11:55:10", level: "DANGEROUS" as const, action: "ESCALATE" as const, agents: "Threat(0.91) + Risk(0.82)", preview: "I know where you live. Don't test me." },
  { id: "SIG-006", time: "2024-12-15 11:52:03", level: "SAFE" as const, action: "ALLOW" as const, agents: "All clear", preview: "Thanks for the update!" },
  { id: "SIG-007", time: "2024-12-15 11:48:42", level: "SUSPICIOUS" as const, action: "FLAG" as const, agents: "Pattern(0.68)", preview: "This is your last warning..." },
  { id: "SIG-008", time: "2024-12-15 11:45:19", level: "SAFE" as const, action: "ALLOW" as const, agents: "All clear", preview: "Meeting confirmed for tomorrow" },
];

const AuditLogs = () => {
  const [levelFilter, setLevelFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");

  const filtered = logs.filter((l) => {
    if (levelFilter !== "all" && l.level !== levelFilter) return false;
    if (actionFilter !== "all" && l.action !== actionFilter) return false;
    return true;
  });

  return (
    <AppLayout>
      <div className="space-y-5">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Audit Logs</h1>
            <p className="text-sm text-muted-foreground">Full system signal history</p>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">{filtered.length} entries</span>
        </div>

        <div className="flex gap-3">
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-40 h-9 text-xs">
              <SelectValue placeholder="Threat Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="SAFE">Safe</SelectItem>
              <SelectItem value="SUSPICIOUS">Suspicious</SelectItem>
              <SelectItem value="DANGEROUS">Dangerous</SelectItem>
            </SelectContent>
          </Select>
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-40 h-9 text-xs">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="ALLOW">Allow</SelectItem>
              <SelectItem value="WARN">Warn</SelectItem>
              <SelectItem value="FLAG">Flag</SelectItem>
              <SelectItem value="ESCALATE">Escalate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-secondary/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-[10px] uppercase tracking-wider">ID</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-[10px] uppercase tracking-wider">Timestamp</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-[10px] uppercase tracking-wider">Threat Level</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-[10px] uppercase tracking-wider">Action</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-[10px] uppercase tracking-wider">Agents</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground text-[10px] uppercase tracking-wider">Message</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((log) => (
                  <tr key={log.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-medium">{log.id}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{log.time}</td>
                    <td className="px-4 py-3"><VerdictBadge verdict={log.level} /></td>
                    <td className="px-4 py-3"><ActionBadge action={log.action} /></td>
                    <td className="px-4 py-3 text-[11px] text-muted-foreground font-mono">{log.agents}</td>
                    <td className="px-4 py-3 text-xs truncate max-w-[200px] text-muted-foreground">{log.preview}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AuditLogs;
