import { AppLayout } from "@/components/AppLayout";
import { ActionBadge } from "@/components/StatusBadge";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";


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
];

const getColor = (status: Violation["risk_status"]) => {
  if (status === "Dangerous") return "#e11d48";
  if (status === "Suspicious") return "#f59e0b";
  return "#10b981";
};

const Violations = () => {
  const [active, setActive] = useState<Violation | null>(null);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "auto";
  }, [active]);

  return (
    <AppLayout>
      {/* padding override FIX */}
      <div className="-m-6 p-6">
      <div className="space-y-6">
        {/* HEADER */}
        <div className="border-b border-black pb-4">
          <h1 className="text-2xl font-semibold uppercase">Violations</h1>
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


        </div>

        {/* ✅ SIMPLE MODAL (NO PORTAL = NO BUGS) */}
        <AnimatePresence>
          {active && (
            <motion.div
              className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center"
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
                className="bg-white border-2 border-black p-6 w-[460px] shadow-[8px_8px_0px_black]"
              >
                <div className="flex justify-between mb-4">
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

                <div className="mb-4">
                  <div className="text-xs font-mono mb-1">ACTION</div>
                  <div className="text-sm">
                    {active.recommended_action}
                  </div>
                </div>

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
