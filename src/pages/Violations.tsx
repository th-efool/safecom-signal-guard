import { AppLayout } from "@/components/AppLayout";
import { ActionBadge } from "@/components/StatusBadge";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Violation = {
  reference_id: string;
  threat_level: number;
  intent_classification: string;
  risk_status: "Safe" | "Suspicious" | "Dangerous";
  confidence: number;
  recommended_action: string;
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
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 1390,
    timestamp: "2024-12-15 12:01:44",
  },

  {
    reference_id: "VC-1004",
    threat_level: 6,
    intent_classification: "Harassment",
    risk_status: "Suspicious",
    confidence: 79,
    recommended_action: "Warn user and monitor behavior",
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 1210,
    timestamp: "2024-12-15 12:06:12",
  },
  {
    reference_id: "VC-1005",
    threat_level: 7,
    intent_classification: "Abusive Language",
    risk_status: "Dangerous",
    confidence: 88,
    recommended_action: "Escalate for policy violation",
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 1505,
    timestamp: "2024-12-15 12:07:45",
  },
  {
    reference_id: "VC-1006",
    threat_level: 6,
    intent_classification: "Scam Attempt",
    risk_status: "Suspicious",
    confidence: 81,
    recommended_action: "Flag and restrict account actions",
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 1670,
    timestamp: "2024-12-15 12:08:21",
  },
  {
    reference_id: "VC-1007",
    threat_level: 7,
    intent_classification: "Social Engineering",
    risk_status: "Dangerous",
    confidence: 86,
    recommended_action: "Escalate and initiate verification protocol",
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 1785,
    timestamp: "2024-12-15 12:09:02",
  },
  {
    reference_id: "VC-1008",
    threat_level: 4,
    intent_classification: "Ambiguous Threat",
    risk_status: "Suspicious",
    confidence: 62,
    recommended_action: "Monitor — insufficient evidence",
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 1100,
    timestamp: "2024-12-15 12:10:33",
  },
  {
    reference_id: "VC-1009",
    threat_level: 3,
    intent_classification: "Manipulative Tone",
    risk_status: "Suspicious",
    confidence: 58,
    recommended_action: "Soft flag for tracking",
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 980,
    timestamp: "2024-12-15 12:11:10",
  },
  {
    reference_id: "VC-1010",
    threat_level: 9,
    intent_classification: "Credible Violent Threat",
    risk_status: "Dangerous",
    confidence: 97,
    recommended_action: "Immediate escalation protocol",
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 2010,
    timestamp: "2024-12-15 12:12:48",
  },
  {
    reference_id: "VC-1011",
    threat_level: 2,
    intent_classification: "Mild Toxicity",
    risk_status: "Safe",
    confidence: 52,
    recommended_action: "Allow",
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 860,
    timestamp: "2024-12-15 12:13:22",
  },
  {
    reference_id: "VC-1012",
    threat_level: 1,
    intent_classification: "Normal Conversation",
    risk_status: "Safe",
    confidence: 99,
    recommended_action: "Allow",
    privacy_mode: "in-memory",
    storage: "none",
    latency_ms: 720,
    timestamp: "2024-12-15 12:14:05",
  },
];

const getColor = (status: Violation["risk_status"]) => {
  if (status === "Dangerous") return "#C2185B";
  if (status === "Suspicious") return "#F59E0B";
  return "#10B981";
};

const Violations = () => {
  const [active, setActive] = useState<Violation | null>(null);

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="border-b border-black pb-4">
          <h1 className="text-2xl font-semibold uppercase">
            Violations
          </h1>
          <p className="font-mono text-xs text-black/60 mt-1">
            &gt; REFERENCE EVENTS · ZERO STORAGE
          </p>
        </div>

        {/* LIST */}
        <div className="space-y-3">
          {violations.map((v) => {
            const color = getColor(v.risk_status);

            return (
              <div
                key={v.reference_id}
                onClick={() => setActive(v)}
                className="cursor-pointer border-2 border-black bg-white p-4 hover:shadow-[4px_4px_0px_black] transition"
              >
                <div className="flex justify-between items-center">

                  {/* LEFT */}
                  <div className="flex items-center gap-4">

                    <span className="font-mono text-xs text-black/50">
                      {v.reference_id}
                    </span>

                    <span
                      className="text-xs px-2 py-0.5 font-mono border"
                      style={{
                        background: color,
                        color: "white",
                        borderColor: color,
                      }}
                    >
                      {v.risk_status}
                    </span>

                    <span className="text-sm font-medium">
                      {v.intent_classification}
                    </span>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-3">

                    <span className="text-xs font-mono">
                      {v.threat_level.toFixed(1)}/10
                    </span>

                    <ActionBadge action={
                      v.risk_status === "Dangerous" ? "ESCALATE" :
                      v.risk_status === "Suspicious" ? "FLAG" : "ALLOW"
                    } />

                    <span className="text-xs text-black/50">
                      {v.timestamp}
                    </span>
                  </div>
                </div>

                {/* BAR */}
                <div className="mt-3 h-1.5 bg-black/10">
                  <div
                    className="h-full"
                    style={{
                      width: `${v.threat_level * 10}%`,
                      background: color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* POP PANEL */}
        <AnimatePresence>
          {active && (
            <motion.div
              className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-[2px] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white border-2 border-black p-6 w-[460px] shadow-[8px_8px_0px_black] relative"
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-[#C2185B]" />

                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">
                    {active.reference_id} — Analysis
                  </h2>

                  <button
                    onClick={() => setActive(null)}
                    className="border border-black px-2 text-xs"
                  >
                    X
                  </button>
                </div>

                {/* SCORE */}
                <div className="mb-4">
                  <div className="text-xs font-mono mb-1">
                    THREAT SCORE
                  </div>

                  <div className="text-3xl font-mono">
                    {active.threat_level.toFixed(1)} / 10
                  </div>

                  <div className="h-2 bg-black/10 mt-2">
                    <div
                      className="h-full"
                      style={{
                        width: `${active.threat_level * 10}%`,
                        background: getColor(active.risk_status),
                      }}
                    />
                  </div>

                  <div className="text-xs font-mono mt-2 text-black/60">
                    Confidence: {active.confidence}%
                  </div>
                </div>

                {/* ACTION */}
                <div className="mb-4">
                  <div className="text-xs font-mono mb-1">
                    ACTION
                  </div>
                  <div className="text-sm">
                    {active.recommended_action}
                  </div>
                </div>

                {/* META */}
                <div className="text-xs font-mono border-t pt-3 text-black/60 space-y-1">
                  <div className="flex justify-between">
                    <span>Latency</span>
                    <span>{active.latency_ms}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mode</span>
                    <span>{active.privacy_mode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Storage</span>
                    <span>{active.storage}</span>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AppLayout>
  );
};

export default Violations;
