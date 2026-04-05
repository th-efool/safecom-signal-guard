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
  decision_time_ms: number;
  stage: string;
  request_scope_id: string;
  processing_node: string;
  policy_version: string;
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
    decision_time_ms: 420,
    stage: "ActionEngine",
    request_scope_id: "REQ-A91X",
    processing_node: "node-3",
    policy_version: "v2.4.1",
    privacy_mode: "in-memory",
  },
  {
    reference_id: "VC-1002",
    timestamp: "2024-12-15 12:04:10",
    threat_level: 7,
    risk_status: "Dangerous",
    action: "ESCALATE",
    confidence: 91,
    latency_ms: 1710,
    decision_time_ms: 390,
    stage: "ActionEngine",
    request_scope_id: "REQ-A91Y",
    processing_node: "node-1",
    policy_version: "v2.4.1",
    privacy_mode: "in-memory",
  },
  {
    reference_id: "VC-1003",
    timestamp: "2024-12-15 12:03:18",
    threat_level: 6,
    risk_status: "Suspicious",
    action: "FLAG",
    confidence: 74,
    latency_ms: 1620,
    decision_time_ms: 310,
    stage: "RiskAnalyzer",
    request_scope_id: "REQ-B22K",
    processing_node: "node-2",
    policy_version: "v2.4.1",
    privacy_mode: "in-memory",
  },
  {
    reference_id: "VC-1004",
    timestamp: "2024-12-15 12:02:51",
    threat_level: 5,
    risk_status: "Suspicious",
    action: "WARN",
    confidence: 68,
    latency_ms: 1480,
    decision_time_ms: 290,
    stage: "ContextValidator",
    request_scope_id: "REQ-C77M",
    processing_node: "node-4",
    policy_version: "v2.4.1",
    privacy_mode: "in-memory",
  },
  {
    reference_id: "VC-1005",
    timestamp: "2024-12-15 12:01:44",
    threat_level: 4,
    risk_status: "Safe",
    action: "ALLOW",
    confidence: 88,
    latency_ms: 980,
    decision_time_ms: 120,
    stage: "Complete",
    request_scope_id: "REQ-D11P",
    processing_node: "node-2",
    policy_version: "v2.4.1",
    privacy_mode: "in-memory",
  },
  {
    reference_id: "VC-1006",
    timestamp: "2024-12-15 12:01:02",
    threat_level: 3,
    risk_status: "Safe",
    action: "ALLOW",
    confidence: 92,
    latency_ms: 870,
    decision_time_ms: 100,
    stage: "Complete",
    request_scope_id: "REQ-E55Z",
    processing_node: "node-1",
    policy_version: "v2.4.1",
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
              Execution telemetry · Stateless · Zero message persistence
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
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">

              <thead>
                <tr className="border-b bg-secondary/50 text-[10px] uppercase">
                  <th className="px-4 py-3">Ref</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Threat</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Conf</th>
                  <th className="px-4 py-3">Latency</th>
                  <th className="px-4 py-3">Decision</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Req</th>
                  <th className="px-4 py-3">Node</th>
                  <th className="px-4 py-3">Policy</th>
                  <th className="px-4 py-3">Privacy</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((log) => (
                  <tr key={log.reference_id} className="border-b hover:bg-secondary/30">

                    <td className="px-4 py-3 font-mono text-xs">{log.reference_id}</td>
                    <td className="px-4 py-3 text-[11px] font-mono text-muted-foreground">{log.timestamp}</td>

                    <td className="px-4 py-3">
                      <VerdictBadge verdict={
                        log.risk_status === "Dangerous" ? "DANGEROUS" :
                        log.risk_status === "Suspicious" ? "SUSPICIOUS" : "SAFE"
                      } />
                    </td>

                    <td className="px-4 py-3">
                      <ActionBadge action={log.action} />
                    </td>

                    <td className="px-4 py-3 text-xs font-mono">{log.confidence}%</td>
                    <td className="px-4 py-3 text-xs font-mono">{log.latency_ms}ms</td>
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{log.decision_time_ms}ms</td>
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{log.stage}</td>
                    <td className="px-4 py-3 text-xs font-mono">{log.request_scope_id}</td>
                    <td className="px-4 py-3 text-xs font-mono">{log.processing_node}</td>
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{log.policy_version}</td>
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{log.privacy_mode}</td>

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
