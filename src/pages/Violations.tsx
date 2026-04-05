import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { VerdictBadge, ActionBadge } from "@/components/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

type Log = {
  reference_id: string;
  timestamp: string;
  threat_level: number;
  risk_status: "Safe" | "Suspicious" | "Dangerous";
  action: "ALLOW" | "WARN" | "FLAG" | "ESCALATE";
  confidence: number;
  latency_ms: number;
  trace: string;
  privacy_mode: string;
};

const logs: Log[] = [
  {
    reference_id: "VC-1001",
    timestamp: "2024-12-15 12:04:32",
    threat_level: 8,
    risk_status: "Dangerous",
    action: "ESCALATE",
    confidence: 94,
    latency_ms: 1842,
    trace: "ThreatDetector → RiskAnalyzer → ContextValidator → ActionEngine",
    privacy_mode: "in-memory",
  },
  {
    reference_id: "VC-1002",
    timestamp: "2024-12-15 12:03:18",
    threat_level: 6,
    risk_status: "Suspicious",
    action: "FLAG",
    confidence: 74,
    latency_ms: 1620,
    trace: "ContextValidator → RiskAnalyzer → ActionEngine",
    privacy_mode: "in-memory",
  },
  {
    reference_id: "VC-1003",
    timestamp: "2024-12-15 12:01:44",
    threat_level: 4,
    risk_status: "Safe",
    action: "ALLOW",
    confidence: 88,
    latency_ms: 980,
    trace: "All agents clear",
    privacy_mode: "in-memory",
  },
];

const AuditLogs = () => {
  const [levelFilter, setLevelFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");

  const filtered = logs.filter((l) => {
    if (levelFilter !== "all" && l.risk_status !== levelFilter) return false;
    if (actionFilter !== "all" && l.action !== actionFilter) return false;
    return true;
  });

  return (
    <AppLayout>
      <div className="space-y-5">

        {/* HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">System Logs</h1>
            <p className="text-sm text-muted-foreground">
              Stateless execution stream · No message persistence
            </p>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            {filtered.length} executions
          </span>
        </div>

        {/* FILTERS */}
        <div className="flex gap-3">
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-40 h-9 text-xs">
              <SelectValue placeholder="Threat Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Safe">Safe</SelectItem>
              <SelectItem value="Suspicious">Suspicious</SelectItem>
              <SelectItem value="Dangerous">Dangerous</SelectItem>
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

        {/* TABLE */}
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-secondary/50">
                  <th className="px-4 py-3 text-[10px]">REF ID</th>
                  <th className="px-4 py-3 text-[10px]">TIME</th>
                  <th className="px-4 py-3 text-[10px]">THREAT</th>
                  <th className="px-4 py-3 text-[10px]">ACTION</th>
                  <th className="px-4 py-3 text-[10px]">CONF</th>
                  <th className="px-4 py-3 text-[10px]">LATENCY</th>
                  <th className="px-4 py-3 text-[10px]">TRACE</th>
                  <th className="px-4 py-3 text-[10px]">PRIVACY</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((log) => (
                  <tr key={log.reference_id} className="border-b hover:bg-secondary/30">

                    <td className="px-4 py-3 font-mono text-xs">
                      {log.reference_id}
                    </td>

                    <td className="px-4 py-3 text-[11px] font-mono text-muted-foreground">
                      {log.timestamp}
                    </td>

                    <td className="px-4 py-3">
                      <VerdictBadge verdict={
                        log.risk_status === "Dangerous" ? "DANGEROUS" :
                        log.risk_status === "Suspicious" ? "SUSPICIOUS" : "SAFE"
                      } />
                    </td>

                    <td className="px-4 py-3">
                      <ActionBadge action={log.action} />
                    </td>

                    <td className="px-4 py-3 text-xs font-mono">
                      {log.confidence}%
                    </td>

                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                      {log.latency_ms}ms
                    </td>

                    <td className="px-4 py-3 text-[11px] font-mono text-muted-foreground max-w-[200px] truncate">
                      {log.trace}
                    </td>

                    <td className="px-4 py-3 text-[11px] font-mono text-muted-foreground">
                      {log.privacy_mode}
                    </td>

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
