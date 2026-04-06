import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ActionBadge } from "@/components/StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";

type Violation = {
  reference_id: string;
  threat_level: number;
  intent_classification: string;
  risk_status: "Safe" | "Suspicious" | "Dangerous";
  confidence: number;
  recommended_action: string;
  trace: string[];
  privacy_mode: string;
  storage: string;
  latency_ms: number;
  timestamp: string;
};

const violations: Violation[] = [
  {
    reference_id: "VC-1001",
    threat_level: 8,
    intent_classification: "Direct Intimidation",
    risk_status: "Dangerous",
    confidence: 94,
    recommended_action: "Escalate and notify platform",
    trace: ["ThreatDetector → RiskAnalyzer → ContextValidator → ActionEngine"],
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 1842,
    timestamp: "2024-12-15 12:04:32",
  },

  {
    reference_id: "VC-1002",
    threat_level: 7,
    intent_classification: "Stalking Behavior",
    risk_status: "Dangerous",
    confidence: 91,
    recommended_action: "Escalate and alert safety team",
    trace: ["ThreatDetector → ContextValidator → RiskAnalyzer → ActionEngine"],
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 1720,
    timestamp: "2024-12-15 11:55:10",
  },

  {
    reference_id: "VC-1003",
    threat_level: 5,
    intent_classification: "Coercion",
    risk_status: "Suspicious",
    confidence: 74,
    recommended_action: "Flag for moderation review",
    trace: ["ContextValidator → RiskAnalyzer → ActionEngine"],
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 1390,
    timestamp: "2024-12-15 12:01:44",
  },

  // 🔹 HARASSMENT
  {
    reference_id: "VC-1004",
    threat_level: 6,
    intent_classification: "Harassment",
    risk_status: "Suspicious",
    confidence: 79,
    recommended_action: "Warn user and monitor behavior",
    trace: ["ContextValidator → RiskAnalyzer → ActionEngine"],
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 1210,
    timestamp: "2024-12-15 12:06:12",
  },

  // 🔹 HATE / ABUSIVE LANGUAGE
  {
    reference_id: "VC-1005",
    threat_level: 7,
    intent_classification: "Abusive Language",
    risk_status: "Dangerous",
    confidence: 88,
    recommended_action: "Escalate for policy violation",
    trace: ["ThreatDetector → ContextValidator → ActionEngine"],
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 1505,
    timestamp: "2024-12-15 12:07:45",
  },

  // 🔹 SCAM / FRAUD PATTERN
  {
    reference_id: "VC-1006",
    threat_level: 6,
    intent_classification: "Scam Attempt",
    risk_status: "Suspicious",
    confidence: 81,
    recommended_action: "Flag and restrict account actions",
    trace: ["RiskAnalyzer → ContextValidator → ActionEngine"],
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 1670,
    timestamp: "2024-12-15 12:08:21",
  },

  // 🔹 SOCIAL ENGINEERING
  {
    reference_id: "VC-1007",
    threat_level: 7,
    intent_classification: "Social Engineering",
    risk_status: "Dangerous",
    confidence: 86,
    recommended_action: "Escalate and initiate verification protocol",
    trace: ["RiskAnalyzer → ContextValidator → ActionEngine"],
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 1785,
    timestamp: "2024-12-15 12:09:02",
  },

  // 🔹 BORDERLINE (IMPORTANT FOR REALISM)
  {
    reference_id: "VC-1008",
    threat_level: 4,
    intent_classification: "Ambiguous Threat",
    risk_status: "Suspicious",
    confidence: 62,
    recommended_action: "Monitor — insufficient evidence for escalation",
    trace: ["ContextValidator → RiskAnalyzer"],
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 1100,
    timestamp: "2024-12-15 12:10:33",
  },

  // 🔹 LOW-RISK BUT FLAGGED PATTERN
  {
    reference_id: "VC-1009",
    threat_level: 3,
    intent_classification: "Manipulative Tone",
    risk_status: "Suspicious",
    confidence: 58,
    recommended_action: "Soft flag for pattern tracking",
    trace: ["ContextValidator → RiskAnalyzer"],
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 980,
    timestamp: "2024-12-15 12:11:10",
  },

  // 🔹 HIGH CONFIDENCE CRITICAL
  {
    reference_id: "VC-1010",
    threat_level: 9,
    intent_classification: "Credible Violent Threat",
    risk_status: "Dangerous",
    confidence: 97,
    recommended_action: "Immediate escalation and emergency protocol",
    trace: ["ThreatDetector → RiskAnalyzer → ContextValidator → ActionEngine"],
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 2010,
    timestamp: "2024-12-15 12:12:48",
  },
];


const Violations = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <AppLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div className="border-b border-black pb-4">
          <h1 className="text-2xl font-semibold uppercase">
            Violation Trace Log
          </h1>
          <p className="font-mono text-xs text-black/60 mt-1">
            &gt; REFERENCE-ONLY EVENTS · ZERO STORAGE MODE
          </p>
        </div>

        {/* LOG STREAM */}
        <div className="brutal-border brutal-shadow">

          {/* HEADER BAR */}
          <div className="border-b border-black p-3 flex justify-between font-mono text-xs uppercase">
            <span>Live Incident Stream</span>
            <span className="animate-blink">_</span>
          </div>

          {/* LOGS */}
          <div className="divide-y divide-black/10">

            {violations.map((v) => {
              const isOpen = openId === v.reference_id;

              return (
                <div
                  key={v.reference_id}
                  onClick={() =>
                    setOpenId(isOpen ? null : v.reference_id)
                  }
                  className="p-3 cursor-pointer hover:bg-black/5 transition-colors"
                >

                  {/* TOP ROW */}
                  <div className="flex justify-between items-center">

                    {/* LEFT */}
                    <div className="flex items-center gap-4">

                      <span className="font-mono text-xs text-black/50">
                        [{v.timestamp.split(" ")[1]}]
                      </span>

                      <span className="font-mono text-xs">
                        {v.reference_id}
                      </span>

                      <span className={`
                        font-mono text-[10px] px-2 py-0.5 border
                        ${v.risk_status === "Dangerous" ? "border-black bg-black text-white" :
                          v.risk_status === "Suspicious" ? "border-black bg-black/10" :
                          "border-black"}
                      `}>
                        {v.risk_status.toUpperCase()}
                      </span>

                      <span className="text-sm">
                        {v.intent_classification}
                      </span>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-4">

                      <span className="font-mono text-xs">
                        {v.threat_level.toFixed(1)}/10
                      </span>

                      <ActionBadge action={
                        v.risk_status === "Dangerous" ? "ESCALATE" :
                        v.risk_status === "Suspicious" ? "FLAG" : "ALLOW"
                      } />

                    </div>
                  </div>

                  {/* THREAT BAR */}
                  <div className="mt-2 h-[2px] bg-black/10">
                    <div
                      className={`
                        h-full
                        ${v.threat_level > 7 ? "bg-black" :
                          v.threat_level > 4 ? "bg-black/60" :
                          "bg-black/30"}
                      `}
                      style={{ width: `${v.threat_level * 10}%` }}
                    />
                  </div>

                  {/* EXPANDED TRACE */}
                  {isOpen && (
                    <div className="mt-4 pt-3 border-t border-black/20 space-y-3">

                      {/* TRACE */}
                      <div>
                        <p className="font-mono text-[10px] text-black/50 mb-1">
                          TRACE
                        </p>
                        <div className="font-mono text-xs">
                          {v.trace.join(" → ")}
                        </div>
                      </div>

                      {/* ACTION */}
                      <div>
                        <p className="font-mono text-[10px] text-black/50 mb-1">
                          ACTION
                        </p>
                        <p className="text-sm">
                          {v.recommended_action}
                        </p>
                      </div>

                      {/* META */}
                      <div className="grid grid-cols-3 text-[10px] font-mono text-black/60 pt-2 border-t border-black/10">
                        <span>LAT: {v.latency_ms}ms</span>
                        <span>PRIV: {v.privacy_mode}</span>
                        <span>STORE: {v.storage}</span>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Violations;
