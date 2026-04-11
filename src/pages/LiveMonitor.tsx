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

/* ---------------- SAME LOGIC (unchanged) ---------------- */

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

/* ---------------- UI ---------------- */

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

    steps.forEach((fn, i) => setTimeout(fn, i * 250));
  };

  return (
    <AppLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div className="flex items-end justify-between border-b border-neutral-200 pb-4">
          <div>
            <h1 className="text-xl font-semibold">Live Monitor</h1>
            <p className="text-xs text-neutral-500 mt-1">
              Real-time safety pipeline execution
            </p>
          </div>

          <span className={`text-xs px-2 py-1 border rounded ${
            processing
              ? "text-yellow-600 border-yellow-300 bg-yellow-50"
              : "text-neutral-600 border-neutral-300"
          }`}>
            {processing ? "Processing" : "Idle"}
          </span>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-12 gap-6">

          {/* INPUT */}
          <div className="col-span-3 bg-white border border-neutral-200 rounded-md p-4 flex flex-col">

            <div className="text-xs text-neutral-500 mb-3">Input</div>

            <Textarea
              placeholder="Enter message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 resize-none text-sm"
            />

            <div className="flex flex-wrap gap-2 mt-3">
              {exampleMessages.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setMessage(ex)}
                  className="text-xs px-2 py-1 border border-neutral-300 rounded hover:bg-neutral-100"
                >
                  {ex}
                </button>
              ))}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={processing || !message.trim()}
              className="mt-4 bg-black text-white text-sm py-2 rounded hover:bg-neutral-800"
            >
              {processing ? "Processing..." : "Execute"}
            </button>
          </div>

          {/* PIPELINE + AGENTS */}
          <div className="col-span-4 space-y-4">

            {/* PIPELINE */}
            <div className="bg-white border border-neutral-200 rounded-md p-4">
              <div className="text-xs text-neutral-500 mb-4">Pipeline</div>

              <div className="flex justify-between text-xs">
                {["Ingest", "Intent", "Agents", "Classify", "Action"].map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded border ${
                      i <= step
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "border-neutral-300 text-neutral-500"
                    }`}>
                      {s}
                    </div>
                    {i < 4 && <div className="w-6 h-[1px] bg-neutral-300" />}
                  </div>
                ))}
              </div>
            </div>

            {/* AGENTS */}
            <div className="bg-white border border-neutral-200 rounded-md p-4">
              <div className="text-xs text-neutral-500 mb-3">Agent Trace</div>

              {liveAgents.length > 0 ? (
                <div className="space-y-3">
                  {liveAgents.map((agent) => (
                    <div key={agent.name} className="border border-neutral-200 rounded p-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{agent.name}</span>

                        <span className={`text-xs px-2 py-0.5 rounded ${
                          agent.verdict === "DANGEROUS"
                            ? "bg-red-100 text-red-700"
                            : agent.verdict === "SUSPICIOUS"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {agent.verdict}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-500">
                        {agent.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-neutral-400">
                  Awaiting signal...
                </div>
              )}
            </div>
          </div>

          {/* ACTION ENGINE */}
          <div className="col-span-5 bg-white border border-neutral-200 rounded-md p-5">

            <div className="text-xs text-neutral-500 mb-4">Action Engine</div>

            {result ? (
              <div className="space-y-5">

                <div>
                  <div className="text-xs text-neutral-500 mb-1">
                    Threat Score
                  </div>

                  <div className="text-3xl font-semibold">
                    {(result.riskScore / 10).toFixed(1)}
                  </div>

                  <div className="h-[3px] bg-neutral-200 mt-2">
                    <div
                      className={`h-full ${
                        result.riskScore > 70
                          ? "bg-red-500"
                          : result.riskScore > 40
                          ? "bg-yellow-500"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${result.riskScore}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 text-xs">
                  {["ALLOW", "WARN", "FLAG", "ESCALATE"].map((a) => (
                    <div
                      key={a}
                      className={`text-center py-2 rounded border ${
                        result.action === a
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "border-neutral-300 text-neutral-500"
                      }`}
                    >
                      {a}
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 text-xs space-y-1">
                  {result.agents.map((a, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{a.name}</span>
                      <span className="text-neutral-500">{a.verdict}</span>
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              <div className="text-sm text-neutral-400">
                No active analysis
              </div>
            )}
          </div>

        </div>
      </div>
    </AppLayout>
  );
};

export default LiveMonitor;
