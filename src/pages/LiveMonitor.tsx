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

  const [step, setStep] = useState(0);
  const [liveAgents, setLiveAgents] = useState<AgentResult[]>([]);

  const handleAnalyze = () => {
    if (!message.trim()) return;

    setProcessing(true);
    setResult(null);
    setStep(0);
    setLiveAgents([]);

    const final = analyzeMessage(message);

    const steps = [
      () => setStep(1),
      () => {
        setStep(2);
        setLiveAgents([final.agents[0]]);
      },
      () => {
        setStep(3);
        setLiveAgents(final.agents.slice(0, 2));
      },
      () => {
        setStep(4);
        setLiveAgents(final.agents);
      },
      () => {
        setStep(5);
        setResult(final);
        setProcessing(false);
      },
    ];

    steps.forEach((fn, i) => {
      setTimeout(fn, i * 300);
    });
  };

  return (
    <AppLayout>
      <div className="space-y-4">

        {/* HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Live Monitor</h1>
            <p className="text-sm text-muted-foreground">Real-time safety analysis pipeline</p>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            {processing ? "Processing..." : "Pipeline ready"}
          </span>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-180px)]">

          {/* LEFT */}
          <div className="lg:col-span-3 space-y-4 flex flex-col">
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

                <Button onClick={handleAnalyze} disabled={processing || !message.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  {processing ? "Analyzing..." : "Analyze"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* CENTER */}
          <div className="lg:col-span-4 space-y-4">

            {/* PIPELINE */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Safety Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-[10px] font-medium text-muted-foreground">
                  {["Incoming", "Intent", "Agents", "Classify", "Action"].map((stepName, i) => (
                    <div key={stepName} className="flex items-center gap-1">
                      <div className={`h-6 px-2 rounded flex items-center justify-center transition-colors ${
                        i <= step ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}>
                        {stepName}
                      </div>
                      {i < 4 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AGENTS */}
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Safety Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence>
                  {liveAgents.length > 0 ? (
                    <motion.div className="space-y-3">
                      {liveAgents.map((agent, i) => (
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
                          <p className="text-[11px] text-muted-foreground italic">{agent.reasoning}</p>
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

            {/* THINKING */}
            {processing && (
              <div className="text-xs font-mono text-muted-foreground">
                Analyzing: "{message}"
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5 space-y-4">
          
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Action Panel</CardTitle>
              </CardHeader>
          
              <CardContent>
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-5"
                    >
          
                      {/* 🔴 THREAT SCORE */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Threat Score</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            result.riskScore > 70 ? "bg-danger/20 text-danger" :
                            result.riskScore > 40 ? "bg-warning/20 text-warning" :
                            "bg-safe/20 text-safe"
                          }`}>
                            {result.action}
                          </span>
                        </div>
          
                        <div className="flex items-end gap-2">
                          <span className="text-3xl font-bold font-mono">
                            {(result.riskScore / 10).toFixed(1)}
                          </span>
                          <span className="text-sm text-muted-foreground">/10</span>
                        </div>
          
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.riskScore}%` }}
                            className={`h-full ${
                              result.riskScore > 70 ? "bg-danger" :
                              result.riskScore > 40 ? "bg-warning" : "bg-safe"
                            }`}
                          />
                        </div>
          
                        <div className="text-xs text-muted-foreground">
                          Confidence: <span className="font-mono font-medium text-foreground">
                            {(Math.max(...result.agents.map(a => a.confidence)) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
          
                      {/* ⚙️ ACTION ENGINE */}
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Action Engine</p>
          
                        <div className="grid grid-cols-4 gap-2">
                          {["ALLOW", "WARN", "FLAG", "ESCALATE"].map((a) => (
                            <div
                              key={a}
                              className={`text-[10px] text-center py-2 rounded border ${
                                result.action === a
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-muted text-muted-foreground"
                              }`}
                            >
                              {a}
                            </div>
                          ))}
                        </div>
                      </div>
          
                      {/* 📊 ANALYSIS RESULT */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">Analysis Result</p>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            result.action === "ESCALATE" ? "bg-danger/20 text-danger" :
                            result.action === "FLAG" ? "bg-warning/20 text-warning" :
                            "bg-safe/20 text-safe"
                          }`}>
                            {result.action}
                          </span>
                        </div>
          
                        <div className="text-[11px] font-mono space-y-1 text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Reference ID</span>
                            <span className="text-foreground">VC-{1000 + result.riskScore}</span>
                          </div>
          
                          <div className="flex justify-between">
                            <span>Latency</span>
                            <span className="text-foreground">{1200 + result.riskScore * 5}ms</span>
                          </div>
          
                          <div>
                            <span>Intent Classification</span>
                            <p className="text-foreground">
                              {result.agents[0]?.category || "General"}
                            </p>
                          </div>
          
                          <div>
                            <span>Recommended Action</span>
                            <p className="text-foreground">
                              {result.action === "ESCALATE"
                                ? "Escalate and notify platform safety team"
                                : result.action === "FLAG"
                                ? "Flag for moderation review"
                                : "Allow"}
                            </p>
                          </div>
                        </div>
          
                        {/* TRACE */}
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Agent Trace</p>
                          <div className="text-[11px] font-mono space-y-1 text-muted-foreground">
                            {result.agents.map((a, i) => (
                              <div key={i} className="flex justify-between">
                                <span>{a.name}</span>
                                <span>{a.verdict}</span>
                              </div>
                            ))}
                          </div>
                        </div>
          
                        {/* META */}
                        <div className="text-[10px] font-mono text-muted-foreground pt-2 border-t">
                          Privacy: in-memory · Storage: none · Policy: v2.4.1
                        </div>
                      </div>
          
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-center h-48 text-sm text-muted-foreground">
                      No active analysis
                    </div>
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
