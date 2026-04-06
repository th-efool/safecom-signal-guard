import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { ActionBadge } from "@/components/StatusBadge";
import { motion, AnimatePresence } from "framer-motion";

type Violation = {
  reference_id: string;
  threat_level: number;
  intent_classification: string;
  risk_status: "Safe" | "Suspicious" | "Dangerous";
  confidence: number;
  recommended_action: string;
  latency_ms: number;
  timestamp: string;
};

const violations: Violation[] = [/* SAME DATA */];

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
        <div>
          <h1 className="text-xl font-semibold uppercase">
            Violations
          </h1>
          <p className="text-sm text-black/60 font-mono">
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
                className="cursor-pointer border border-black p-4 hover:shadow-[4px_4px_0px_black] transition-all bg-white"
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-[2px] flex items-center justify-center"
              onClick={() => setActive(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-white border border-black p-6 w-[420px] shadow-[6px_6px_0px_black]"
              >
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
                    <span>in-memory</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Storage</span>
                    <span>none</span>
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
