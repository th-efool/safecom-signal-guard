import { AppLayout } from "@/components/AppLayout";
import { useState } from "react";

type Log = {
  id: string;
  threat: string;
  action: string;
  confidence: number;
  latency: number;
  decision: string;
  stage: string;
};

const logs: Log[] = [
  {
    id: "LOG-001",
    threat: "Direct Threat",
    action: "ESCALATE",
    confidence: 94,
    latency: 182,
    decision: "Dangerous",
    stage: "ThreatDetector",
  },
  {
    id: "LOG-002",
    threat: "Coercion",
    action: "FLAG",
    confidence: 71,
    latency: 140,
    decision: "Suspicious",
    stage: "RiskAnalyzer",
  },
];

const getColor = (decision: string) => {
  if (decision === "Dangerous") return "#C2185B";
  if (decision === "Suspicious") return "#F59E0B";
  return "#10B981";
};

const AuditLogs = () => {
  const [level, setLevel] = useState("All Levels");
  const [open, setOpen] = useState(false);

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

          {/* DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="border border-black px-3 py-1 text-sm bg-white"
            >
              {level}
            </button>

            {open && (
              <div
                className="
                  absolute top-full mt-1 w-[160px]
                  bg-white border border-black z-50
                  shadow-[4px_4px_0px_black]
                "
              >
                {["All Levels", "Dangerous", "Suspicious", "Safe"].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => {
                      setLevel(opt);
                      setOpen(false);
                    }}
                    className="
                      px-3 py-2 text-sm cursor-pointer
                      text-black bg-white
                      hover:bg-black hover:text-white
                    "
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
          {logs.map((log) => {
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
          })}

        </div>

      </div>
    </AppLayout>
  );
};

export default AuditLogs;
