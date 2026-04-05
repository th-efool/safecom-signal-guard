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
  return (
    <AppLayout>
      <div className="space-y-4">

        {/* HEADER */}
        <div>
          <h1 className="text-xl font-semibold">Violations</h1>
          <p className="text-sm text-muted-foreground">
            Reference-based safety events · No raw message storage
          </p>
        </div>

        {/* LIST */}
        <div className="space-y-3">
          {violations.map((v) => (
            <Dialog key={v.reference_id}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:border-primary/40 transition-all">

                  <CardContent className="py-4">

                    <div className="flex items-center justify-between">

                      {/* LEFT */}
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-muted-foreground">
                          {v.reference_id}
                        </span>

                        <span className={`text-xs px-2 py-0.5 rounded ${
                          v.risk_status === "Dangerous" ? "bg-danger/20 text-danger" :
                          v.risk_status === "Suspicious" ? "bg-warning/20 text-warning" :
                          "bg-safe/20 text-safe"
                        }`}>
                          {v.risk_status}
                        </span>

                        <span className="text-sm font-medium">
                          {v.intent_classification}
                        </span>
                      </div>

                      {/* RIGHT */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono">
                          {(v.threat_level).toFixed(1)}/10
                        </span>
                        <ActionBadge action={
                          v.risk_status === "Dangerous" ? "ESCALATE" :
                          v.risk_status === "Suspicious" ? "FLAG" : "ALLOW"
                        } />
                        <span className="text-xs text-muted-foreground">
                          {v.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          v.threat_level > 7 ? "bg-danger" :
                          v.threat_level > 4 ? "bg-warning" : "bg-safe"
                        }`}
                        style={{ width: `${v.threat_level * 10}%` }}
                      />
                    </div>

                  </CardContent>
                </Card>
              </DialogTrigger>

              {/* MODAL */}
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>
                    {v.reference_id} — System Analysis
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">

                  {/* THREAT */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Threat Score</p>

                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold font-mono">
                        {v.threat_level.toFixed(1)}
                      </span>
                      <span className="text-sm text-muted-foreground">/10</span>
                    </div>

                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          v.threat_level > 7 ? "bg-danger" :
                          v.threat_level > 4 ? "bg-warning" : "bg-safe"
                        }`}
                        style={{ width: `${v.threat_level * 10}%` }}
                      />
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Confidence: <span className="font-mono text-foreground">{v.confidence}%</span>
                    </p>
                  </div>

                  {/* ACTION */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Recommended Action</p>
                    <p className="text-sm font-medium">{v.recommended_action}</p>
                  </div>

                  {/* TRACE */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Execution Trace</p>
                    <div className="text-xs font-mono bg-muted p-2 rounded">
                      {v.trace[0]}
                    </div>
                  </div>

                  {/* META */}
                  <div className="text-xs font-mono text-muted-foreground space-y-1 pt-2 border-t">
                    <div className="flex justify-between">
                      <span>Latency</span>
                      <span className="text-foreground">{v.latency_ms}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Privacy Mode</span>
                      <span className="text-foreground">{v.privacy_mode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage</span>
                      <span className="text-foreground">{v.storage}</span>
                    </div>
                  </div>

                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Violations;
