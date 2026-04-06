import { AppLayout } from "@/components/AppLayout";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

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

const getColor = (d: Log["decision"]) => {
  if (d === "Dangerous") return "bg-[#C2185B] text-white";
  if (d === "Suspicious") return "bg-[#F59E0B] text-white";
  return "bg-[#10B981] text-white";
};

const AuditLogs = () => {
  const [level, setLevel] = useState("All Levels");
  const [action, setAction] = useState("All Actions");

  const [open, setOpen] = useState<null | "level" | "action">(null);

  const filtered = logs.filter((l) => {
    const levelOk = level === "All Levels" || l.decision === level;
    const actionOk = action === "All Actions" || l.action === action;
    return levelOk && actionOk;
  });

  const Dropdown = ({
    label,
    value,
    options,
    type,
    setValue,
  }: any) => (
    <div className="relative">
      <button
        onClick={() => setOpen(open === type ? null : type)}
        className="flex items-center gap-2 border border-black px-3 py-1.5 bg-white text-sm"
      >
        {value}
        <ChevronDown size={14} />
      </button>

      {open === type && (
        <div className="absolute top-full mt-1 w-[180px] bg-white border border-black shadow-[4px_4px_0px_black] z-50">
          {options.map((opt: string) => (
            <div
              key={opt}
              onClick={() => {
                setValue(opt);
                setOpen(null);
              }}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-black hover:text-white"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );

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
        <div className="flex gap-3">
          <Dropdown
            label="Level"
            value={level}
            options={["All Levels", "Dangerous", "Suspicious", "Safe"]}
            type="level"
            setValue={setLevel}
          />

          <Dropdown
            label="Action"
            value={action}
            options={["All Actions", "ESCALATE", "FLAG", "ALLOW"]}
            type="action"
            setValue={setAction}
          />
        </div>

        {/* TABLE */}
        <div className="border border-black">

          {/* HEADER */}
          <div className="grid grid-cols-6 text-[11px] font-mono px-4 py-2 border-b border-black bg-white">
            <span>THREAT</span>
            <span>ACTION</span>
            <span>CONF</span>
            <span>LATENCY</span>
            <span>DECISION</span>
            <span>STAGE</span>
          </div>

          {/* ROWS */}
          {filtered.map((log) => (
            <div
              key={log.id}
              className="grid grid-cols-6 px-4 py-2 text-sm border-t border-black/10 hover:bg-black/5"
            >
              <span>{log.threat}</span>
              <span className="font-mono">{log.action}</span>
              <span>{log.confidence}%</span>
              <span className="font-mono">{log.latency}ms</span>

              <span className={`px-2 py-0.5 text-xs w-fit ${getColor(log.decision)}`}>
                {log.decision}
              </span>

              <span className="font-mono text-black/60">
                {log.stage}
              </span>
            </div>
          ))}

        </div>
      </div>
    </AppLayout>
  );
};

export default AuditLogs;
