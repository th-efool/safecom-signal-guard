import { AppLayout } from "@/components/AppLayout";
import { VerdictBadge, ActionBadge } from "@/components/StatusBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const logs: Log[] = [/* keep your data */];

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
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-end justify-between border-b border-black pb-4">
          <div>
            <h1 className="text-xl font-semibold uppercase">
              System Logs
            </h1>
            <p className="font-mono text-xs text-black/60 mt-1">
              &gt; EXECUTION TELEMETRY · STATELESS · ZERO STORAGE
            </p>
          </div>

          <span className="font-mono text-xs border border-black px-2 py-1">
            {filtered.length} EXECUTIONS
          </span>
        </div>

        {/* FILTERS */}
        <div className="flex gap-3">

          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-40 h-9 text-xs border border-black bg-white text-black">
              <SelectValue placeholder="Threat Level" />
            </SelectTrigger>

            <SelectContent className="bg-white border border-black text-black">
              <SelectItem value="all" className="hover:bg-black hover:text-white">
                All Levels
              </SelectItem>
              <SelectItem value="Safe" className="hover:bg-black hover:text-white">
                Safe
              </SelectItem>
              <SelectItem value="Suspicious" className="hover:bg-black hover:text-white">
                Suspicious
              </SelectItem>
              <SelectItem value="Dangerous" className="hover:bg-black hover:text-white">
                Dangerous
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-40 h-9 text-xs border border-black bg-white text-black">
              <SelectValue placeholder="Action" />
            </SelectTrigger>

            <SelectContent className="bg-white border border-black text-black">
              <SelectItem value="all" className="hover:bg-black hover:text-white">
                All Actions
              </SelectItem>
              <SelectItem value="ALLOW" className="hover:bg-black hover:text-white">
                Allow
              </SelectItem>
              <SelectItem value="WARN" className="hover:bg-black hover:text-white">
                Warn
              </SelectItem>
              <SelectItem value="FLAG" className="hover:bg-black hover:text-white">
                Flag
              </SelectItem>
              <SelectItem value="ESCALATE" className="hover:bg-black hover:text-white">
                Escalate
              </SelectItem>
            </SelectContent>
          </Select>

        </div>

        {/* TABLE */}
        <div className="border border-black overflow-x-auto">

          <table className="w-full text-sm font-mono">

            {/* HEAD */}
            <thead>
              <tr className="border-b border-black text-[10px] uppercase bg-white">
                <th className="px-4 py-3 text-left">Ref</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Threat</th>
                <th className="px-4 py-3 text-left">Action</th>
                <th className="px-4 py-3 text-left">Conf</th>
                <th className="px-4 py-3 text-left">Latency</th>
                <th className="px-4 py-3 text-left">Decision</th>
                <th className="px-4 py-3 text-left">Stage</th>
                <th className="px-4 py-3 text-left">Req</th>
                <th className="px-4 py-3 text-left">Node</th>
                <th className="px-4 py-3 text-left">Policy</th>
                <th className="px-4 py-3 text-left">Privacy</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {filtered.map((log) => (
                <tr
                  key={log.reference_id}
                  className="border-b border-black/20 hover:bg-black/5 transition"
                >
                  <td className="px-4 py-3 text-xs">{log.reference_id}</td>

                  <td className="px-4 py-3 text-[11px] text-black/60">
                    {log.timestamp}
                  </td>

                  <td className="px-4 py-3">
                    <VerdictBadge
                      verdict={
                        log.risk_status === "Dangerous"
                          ? "DANGEROUS"
                          : log.risk_status === "Suspicious"
                          ? "SUSPICIOUS"
                          : "SAFE"
                      }
                    />
                  </td>

                  <td className="px-4 py-3">
                    <ActionBadge action={log.action} />
                  </td>

                  <td className="px-4 py-3 text-xs">
                    {log.confidence}%
                  </td>

                  <td className="px-4 py-3 text-xs">
                    {log.latency_ms}ms
                  </td>

                  <td className="px-4 py-3 text-xs text-black/50">
                    {log.decision_time_ms}ms
                  </td>

                  <td className="px-4 py-3 text-xs text-black/50">
                    {log.stage}
                  </td>

                  <td className="px-4 py-3 text-xs">
                    {log.request_scope_id}
                  </td>

                  <td className="px-4 py-3 text-xs">
                    {log.processing_node}
                  </td>

                  <td className="px-4 py-3 text-xs text-black/50">
                    {log.policy_version}
                  </td>

                  <td className="px-4 py-3 text-xs text-black/50">
                    {log.privacy_mode}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </AppLayout>
  );
};

export default AuditLogs;
