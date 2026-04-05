import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { VerdictBadge, ActionBadge } from "@/components/StatusBadge";
import { ArrowRight, Send, ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Verdict = "SAFE" | "SUSPICIOUS" | "DANGEROUS";
type Action = "ALLOW" | "WARN" | "FLAG" | "ESCALATE";

interface AgentResult {
  name: string;
  verdict: Verdict;
  confidence: number;
  category: string;
  reasoning: string;
}

interface AnalysisResult {
  agents: AgentResult[];
  action: Action;
  riskScore: number;
  reasoning: string;
}

const exampleMessages = [
  "I will find you and make you regret this",
  "Hey, can we reschedule the meeting to 3pm?",
  "You better watch your back. I know where you live.",
  "If you don't do what I say, there will be consequences",
];

function analyzeMessage(msg: string): AnalysisResult {
  const lower = msg.toLowerCase();
  const hasThreat = /find you|regret|watch your back|know where|hurt|kill|destroy/.test(lower);
  const hasCoercion = /better|consequences|if you don't|or else|must do/.test(lower);
  const isSafe = !hasThreat && !hasCoercion;

  if (hasThreat) {
    return {
      agents: [
        { name: "Threat Detector", verdict: "DANGEROUS", confidence: 0.94, category: "Threat", reasoning: "Direct threat language with violent intent" },
        { name: "Context Analyzer", verdict: "DANGEROUS", confidence: 0.88, category: "Threat", reasoning: "Threatening context with personal targeting" },
        { name: "Risk Analyzer", verdict: "SUSPICIOUS", confidence: 0.72, category: "Threat", reasoning: "Elevated risk pattern consistent with threats" },
      ],
      action: "ESCALATE",
      riskScore: 92,
      reasoning: "Threat Detector (0.94, DANGEROUS) triggered escalation threshold",
    };
  }
  if (hasCoercion) {
    return {
      agents: [
        { name: "Threat Detector", verdict: "SUSPICIOUS", confidence: 0.61, category: "Coercion", reasoning: "Conditional language with implied consequences" },
        { name: "Context Analyzer", verdict: "SUSPICIOUS", confidence: 0.74, category: "Coercion", reasoning: "Coercive phrasing detected in communication" },
        { name: "Risk Analyzer", verdict: "SAFE", confidence: 0.45, category: "Coercion", reasoning: "Low direct risk but manipulative pattern" },
      ],
      action: "FLAG",
      riskScore: 58,
      reasoning: "Context Analyzer (0.74, SUSPICIOUS) — coercive pattern flagged for review",
    };
  }
  return {
    agents: [
      { name: "Threat Detector", verdict: "SAFE", confidence: 0.12, category: "—", reasoning: "No threatening language detected" },
      { name: "Context Analyzer", verdict: "SAFE", confidence: 0.08, category: "—", reasoning: "Normal conversational context" },
      { name: "Risk Analyzer", verdict: "SAFE", confidence: 0.05, category: "—", reasoning: "No risk indicators present" },
    ],
    action: "ALLOW",
    riskScore: 4,
    reasoning: "All agents report safe — no action required",
  };
}

const LiveMonitor = () => {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleAnalyze = () => {
    if (!message.trim()) return;
    setProcessing(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzeMessage(message));
      setProcessing(false);
    }, 1200);
  };

  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Live Monitor</h1>
            <p className="text-sm text-muted-foreground">Real-time safety analysis pipeline</p>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">Pipeline ready</span>
        </div>

        <div className="grid grid-cols-3 gap-4 h-[calc(100vh-180px)]">
          {/* LEFT: Input/Output */}
          <div className="space-y-4 flex flex-col">
            <Card className="flex-1 flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Input Message</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-3">
                <Textarea
                  placeholder="Enter a message to analyze..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 resize-none font-mono text-sm"
                />
                <div className="flex flex-wrap gap-1.5">
                  {exampleMessages.map((ex, i) => (
                    <button
                      key={i}
                      onClick={() => setMessage(ex)}
                      className="text-[10px] px-2 py-1 rounded-md bg-secondary text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors truncate max-w-[200px]"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
                <Button onClick={handleAnalyze} disabled={processing || !message.trim()} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  {processing ? "Analyzing..." : "Analyze"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Output</CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {processing && (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
                      Processing through safety pipeline...
                    </motion.div>
                  )}
                  {!processing && result && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {result.action === "ALLOW" && (
                        <div className="flex items-center gap-2 text-safe">
                          <ShieldCheck className="h-5 w-5" />
                          <span className="font-medium">No threat detected</span>
                        </div>
                      )}
                      {result.action === "WARN" || result.action === "FLAG" ? (
                        <div className="flex items-center gap-2 text-warning">
                          <AlertTriangle className="h-5 w-5" />
                          <span className="font-medium">Warning signal — flagged for review</span>
                        </div>
                      ) : null}
                      {result.action === "ESCALATE" && (
                        <div className="flex items-center gap-2 text-danger">
                          <ShieldAlert className="h-5 w-5" />
                          <span className="font-medium">Threat detected — escalation triggered</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                  {!processing && !result && (
                    <motion.p key="empty" className="text-sm text-muted-foreground">
                      Submit a message to begin analysis
                    </motion.p>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          {/* CENTER: Pipeline + Agents */}
          <div className="space-y-4 flex flex-col">
            {/* Pipeline Steps */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Safety Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-[10px] font-medium text-muted-foreground">
                  {["Incoming", "Intent Analysis", "Safety Agents", "Classification", "Action"].map((step, i) => (
                    <div key={step} className="flex items-center gap-1">
                      <div className={`h-6 px-2 rounded flex items-center justify-center ${
                        processing && i <= 2 ? "bg-primary text-primary-foreground" :
                        result ? "bg-safe text-safe-foreground" : "bg-muted"
                      } transition-colors`}>
                        {step}
                      </div>
                      {i < 4 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Agent Outputs */}
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Safety Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence>
                  {result ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-3"
                    >
                      {result.agents.map((agent, i) => (
                        <motion.div
                          key={agent.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                          className="p-3 rounded-lg border bg-card"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-semibold">{agent.name}</span>
                            <VerdictBadge verdict={agent.verdict} />
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-[11px] text-muted-foreground">
                            <span>Confidence: <span className="font-mono font-medium text-foreground">{agent.confidence.toFixed(2)}</span></span>
                            <span>Category: <span className="font-medium text-foreground">{agent.category}</span></span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-1.5 italic">{agent.reasoning}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                      Agents idle — awaiting input
                    </div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: Action Panel */}
          <div className="space-y-4 flex flex-col">
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Action Panel</CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div
                      key="action"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="text-center py-4">
                        <p className="text-xs text-muted-foreground mb-2">System Action</p>
                        <ActionBadge action={result.action} className="text-lg px-4 py-1.5" />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Risk Score</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${result.riskScore}%` }}
                                transition={{ duration: 0.6 }}
                                className={`h-full rounded-full ${
                                  result.riskScore > 70 ? "bg-danger" :
                                  result.riskScore > 40 ? "bg-warning" : "bg-safe"
                                }`}
                              />
                            </div>
                            <span className="text-sm font-mono font-bold">{result.riskScore}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Action Reasoning</p>
                          <p className="text-sm font-mono bg-muted p-2 rounded text-foreground">{result.reasoning}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Signal Summary</p>
                          <div className="space-y-1.5">
                            {result.agents.map((a) => (
                              <div key={a.name} className="flex items-center justify-between text-xs">
                                <span>{a.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{a.confidence.toFixed(2)}</span>
                                  <VerdictBadge verdict={a.verdict} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="empty" className="flex items-center justify-center h-48 text-sm text-muted-foreground">
                      No active analysis
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default LiveMonitor;
