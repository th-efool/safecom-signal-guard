import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Textarea } from "@/components/ui/textarea";

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
      reasoning: "Threat detected — escalation triggered",
    };
  }

  if (hasCoercion) {
    return {
      agents: [
        { name: "Threat Detector", verdict: "SUSPICIOUS", confidence: 0.61, category: "Coercion", reasoning: "Conditional language detected" },
        { name: "Context Analyzer", verdict: "SUSPICIOUS", confidence: 0.74, category: "Coercion", reasoning: "Coercive phrasing identified" },
        { name: "Risk Analyzer", verdict: "SAFE", confidence: 0.45, category: "Coercion", reasoning: "Low direct risk" },
      ],
      action: "FLAG",
      riskScore: 58,
      reasoning: "Coercion pattern flagged",
    };
  }

  return {
    agents: [
      { name: "Threat Detector", verdict: "SAFE", confidence: 0.12, category: "—", reasoning: "No threat detected" },
      { name: "Context Analyzer", verdict: "SAFE", confidence: 0.08, category: "—", reasoning: "Normal context" },
      { name: "Risk Analyzer", verdict: "SAFE", confidence: 0.05, category: "—", reasoning: "No risk" },
    ],
    action: "ALLOW",
    riskScore: 4,
    reasoning: "Safe message",
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

    steps.forEach((fn, i) => setTimeout(fn, i * 300));
  };

  return (
    <AppLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div className="flex items-end justify-between border-b border-black pb-4">
          <div>
            <h1 className="text-2xl font-semibold uppercase">
              Live Monitor
            </h1>
            <p className="font-mono text-xs text-black/60 mt-1">
              &gt; REAL-TIME SAFETY PIPELINE EXECUTION
            </p>
          </div>

          <span className="font-mono text-xs border border-[#C2185B] text-[#C2185B] px-2 py-1">
            {processing ? "PROCESSING" : "IDLE"}
          </span>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-12 gap-6">

          {/* INPUT */}
          <div className="col-span-3 brutal-border brutal-shadow p-4 flex flex-col">

            <div className="font-mono text-[10px] mb-3 text-black/50">
              INPUT PAYLOAD
            </div>

            <Textarea
              placeholder="Enter message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 resize-none font-mono text-sm border border-black"
            />

            <div className="flex flex-wrap gap-2 mt-3">
              {exampleMessages.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setMessage(ex)}
                  className="text-[10px] px-2 py-1 border border-black font-mono hover:bg-black hover:text-white"
                >
                  {ex}
                </button>
              ))}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={processing || !message.trim()}
              className="mt-4 border border-black px-3 py-2 font-mono text-xs bg-black text-white hover:bg-white hover:text-black"
            >
              {processing ? "PROCESSING..." : "EXECUTE"}
            </button>
          </div>

          {/* PIPELINE + AGENTS */}
          <div className="col-span-4 space-y-4">

            {/* PIPELINE */}
            <div className="brutal-border brutal-shadow p-4">
              <div className="font-mono text-[10px] mb-4 text-black/50">
                PIPELINE
              </div>

              <div className="flex justify-between">
                {["INGEST", "INTENT", "AGENTS", "CLASSIFY", "ACTION"].map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`px-2 py-1 text-[10px] border border-black font-mono ${
                      i <= step ? "bg-[#C2185B] text-white border-[#C2185B]" : ""
                    }`}>
                      {s}
                    </div>
                    {i < 4 && <div className="w-6 h-[1px] bg-black/40" />}
                  </div>
                ))}
              </div>
            </div>

            {/* AGENTS */}
            <div className="brutal-border brutal-shadow p-4">

              <div className="font-mono text-[10px] mb-3 text-black/50">
                AGENT TRACE
              </div>

              {liveAgents.length > 0 ? (
                <div className="space-y-3">
                  {liveAgents.map((agent) => (
                    <div key={agent.name} className="border border-black p-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-semibold">{agent.name}</span>

                        <span className={`
                          text-[10px] px-2 py-0.5 font-mono border
                          ${agent.verdict === "DANGEROUS"
                            ? "bg-[#C2185B] text-white border-[#C2185B]"
                            : agent.verdict === "SUSPICIOUS"
                            ? "bg-[#F59E0B] text-black border-[#F59E0B]"
                            : "bg-[#10B981] text-white border-[#10B981]"
                          }
                        `}>
                          {agent.verdict}
                        </span>
                      </div>

                      <p className="text-[11px] font-mono text-black/60">
                        {agent.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs font-mono text-black/50">
                  AWAITING SIGNAL...
                </div>
              )}
            </div>
          </div>

          {/* ACTION ENGINE */}
          <div className="col-span-5 brutal-border brutal-shadow p-5">

            <div className="font-mono text-[10px] mb-4 text-black/50">
              ACTION ENGINE
            </div>

            {result ? (
              <div className="space-y-5">

                {/* SCORE */}
                <div>
                  <div className="text-xs font-mono mb-1">
                    THREAT SCORE
                  </div>

                  <div className="text-4xl font-mono">
                    {(result.riskScore / 10).toFixed(1)}
                  </div>

                  <div className="h-[3px] bg-black/10 mt-2">
                    <div
                      className={`h-full ${
                        result.riskScore > 70
                          ? "bg-[#C2185B]"
                          : result.riskScore > 40
                          ? "bg-[#F59E0B]"
                          : "bg-[#10B981]"
                      }`}
                      style={{ width: `${result.riskScore}%` }}
                    />
                  </div>
                </div>

                {/* ACTION STATES */}
                <div className="grid grid-cols-4 gap-2 font-mono text-[10px]">
                  {["ALLOW", "WARN", "FLAG", "ESCALATE"].map((a) => (
                    <div
                      key={a}
                      className={`
                        text-center py-2 border
                        ${
                          result.action === a
                            ? a === "ESCALATE"
                              ? "bg-[#C2185B] text-white border-[#C2185B]"
                              : a === "FLAG"
                              ? "bg-[#F59E0B] text-black border-[#F59E0B]"
                              : a === "WARN"
                              ? "bg-[#F59E0B]/80 text-black border-[#F59E0B]"
                              : "bg-[#10B981] text-white border-[#10B981]"
                            : "border-black/40"
                        }
                      `}
                    >
                      {a}
                    </div>
                  ))}
                </div>

                {/* TRACE */}
                <div className="border-t pt-3 font-mono text-[11px] space-y-1">
                  {result.agents.map((a, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{a.name}</span>
                      <span>{a.verdict}</span>
                    </div>
                  ))}
                </div>

                {/* META */}
                <div className="border-t pt-2 font-mono text-[10px] text-black/50">
                  LAT: {1200 + result.riskScore * 5}ms · PRIV: in-memory · STORE: none
                </div>

              </div>
            ) : (
              <div className="text-sm font-mono text-black/50">
                NO ACTIVE ANALYSIS
              </div>
            )}

          </div>

        </div>
      </div>
    </AppLayout>
  );
};

export default LiveMonitor;
