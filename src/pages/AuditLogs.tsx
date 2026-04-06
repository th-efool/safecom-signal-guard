import { AppLayout } from "@/components/AppLayout";
import { useState } from "react";

type Log = {
  id: string;
  threat: string;
  action: "ESCALATE" | "FLAG" | "ALLOW";
  confidence: number;
  latency: number;
  decision: "Dangerous" | "Suspicious" | "Safe";
  stage: string;
};

const logs: Log[] = [
  { id: "1", threat: "Direct Threat", action: "ESCALATE", confidence: 94, latency: 182, decision: "Dangerous", stage: "ThreatDetector" },
  { id: "2", threat: "Stalking", action: "ESCALATE", confidence: 91, latency: 170, decision: "Dangerous", stage: "ContextAnalyzer" },
  { id: "3", threat: "Coercion", action: "FLAG", confidence: 74, latency: 139, decision: "Suspicious", stage: "RiskAnalyzer" },
  { id: "4", threat: "Harassment", action: "FLAG", confidence: 79, latency: 121, decision: "Suspicious", stage: "ContextValidator" },
  { id: "5", threat: "Abusive Language", action: "ESCALATE", confidence: 88, latency: 150, decision: "Dangerous", stage: "ThreatDetector" },
  { id: "6", threat: "Scam Attempt", action: "FLAG", confidence: 81, latency: 167, decision: "Suspicious", stage: "RiskAnalyzer" },
  { id: "7", threat: "Social Engineering", action: "ESCALATE", confidence: 86, latency: 178, decision: "Dangerous", stage: "RiskAnalyzer" },
  { id: "8", threat: "Ambiguous Threat", action: "FLAG", confidence: 62, latency: 110, decision: "Suspicious", stage: "ContextValidator" },
  { id: "9", threat: "Manipulation", action: "FLAG", confidence: 58, latency: 98, decision: "Suspicious", stage: "ContextAnalyzer" },
  { id: "10", threat: "Normal Chat", action: "ALLOW", confidence: 99, latency: 80, decision: "Safe", stage: "ContextAnalyzer" },
];

const getColor = (decision: Log["decision"]) => {
  if (decision === "Dangerous") return "#C2185B";
  if (decision === "Suspicious") return "#F59E0B";
  return "#10B981";
};

const AuditLogs = () => {
  const [levelFilter, setLevelFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");

  const [openLevel, setOpenLevel] = useState(false);
  const [openAction, setOpenAction] = useState(false);

  const filteredLogs = logs.filter((log) => {
    const levelMatch =
      levelFilter === "All" || log.decision === levelFilter;
    const actionMatch =
      actionFilter === "All" || log.action === actionFilter;

    return levelMatch && actionMatch;
  });

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="border-b border-black pb-4">
          <h1 className="text-2xl font-semibold uppercase">
            System Logs
          </h1>
          <p className="font-mono text-xs text-black/60 mt-1">
            &gt; EXECUTION TELEMETRY · ZERO STORAGE
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex gap-3 relative">

          {/* LEVEL FILTER */}
          <div className="relative">
            <button
              onClick={() => setOpenLevel(!openLevel)}
              className="border border-black px-3 py-1 bg-white text-sm"
            >
              {levelFilter}
            </button>

            {openLevel && (
              <div className="absolute top-full mt-1 w-[160px] bg-white border border-black z-50 shadow-[4px_4px_0px_black]">
                {["All", "Dangerous", "Suspicious", "Safe"].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => {
                      setLevelFilter(opt);
                      setOpenLevel(false);
                    }}
                    className="px-3 py-2 text-sm cursor-pointer text-black hover:bg-black hover:text-white"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ACTION FILTER */}
          <div className="relative">
            <button
              onClick={() => setOpenAction(!openAction)}
              className="border border-black px-3 py-1 bg-white text-sm"
            >
              {actionFilter}
            </button>

            {openAction && (
              <div className="absolute top-full mt-1 w-[160px] bg-white border border-black z-50 shadow-[4px_4px_0px_black]">
                {["All", "ESCALATE", "FLAG", "ALLOW"].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => {
                      setActionFilter(opt);
                      setOpenAction(false);
                    }}
                    className="px-3 py-2 text-sm cursor-pointer text-black hover:bg-black hover:text-white"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* TABLE */}
        <div className="border-2 border-black">

          {/* HEADER */}
          <div className="grid grid-cols-6 text-[11px] font-mono border-b border-black p-2 bg-white">
            <span>THREAT</span>
            <span>ACTION</span>
            <span>CONF</span>
            <span>LATENCY</span>
            <span>DECISION</span>
            <span>STAGE</span>
          </div>

          {/* ROWS */}
          {filteredLogs.length === 0 ? (
            <div className="p-4 text-sm font-mono text-black/50">
              NO MATCHING LOGS
            </div>
          ) : (
            filteredLogs.map((log) => {
              const color = getColor(log.decision);

              return (
                <div
                  key={log.id}
                  className="grid grid-cols-6 text-xs p-2 border-t border-black/10 bg-white hover:bg-black/5"
                >
                  <span>{log.threat}</span>
                  <span className="font-mono">{log.action}</span>
                  <span>{log.confidence}%</span>
                  <span>{log.latency}ms</span>

                  <span
                    className="px-2 py-0.5 text-xs font-mono border w-fit"
                    style={{
                      background: color,
                      color: "white",
                      borderColor: color,
                    }}
                  >
                    {log.decision}
                  </span>

                  <span className="font-mono text-black/60">
                    {log.stage}
                  </span>
                </div>
              );
            })
          )}
        </div>

      </div>
    </AppLayout>
  );
};

export default AuditLogs;
