import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VerdictBadge, ActionBadge } from "@/components/StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const violations = [
  {
    id: "VIO-001",
    category: "Threat",
    severity: "DANGEROUS" as const,
    confidence: 0.94,
    agent: "Threat Detector",
    action: "ESCALATE" as const,
    message: "I will find you and make you regret this",
    time: "2024-12-15 12:04:32",
    agents: [
      { name: "Threat Detector", verdict: "DANGEROUS" as const, confidence: 0.94, reasoning: "Direct threat with violent intent" },
      { name: "Context Analyzer", verdict: "DANGEROUS" as const, confidence: 0.88, reasoning: "Personal targeting detected" },
      { name: "Risk Analyzer", verdict: "SUSPICIOUS" as const, confidence: 0.72, reasoning: "Elevated risk pattern" },
    ],
    decisionReasoning: "High-confidence threat detection (0.94) with consistent dangerous signals across multiple agents. Automatic escalation triggered.",
  },
  {
    id: "VIO-002",
    category: "Stalking",
    severity: "DANGEROUS" as const,
    confidence: 0.91,
    agent: "Threat Detector",
    action: "ESCALATE" as const,
    message: "I know where you live. Don't test me.",
    time: "2024-12-15 11:55:10",
    agents: [
      { name: "Threat Detector", verdict: "DANGEROUS" as const, confidence: 0.91, reasoning: "Location-based threat detected" },
      { name: "Context Analyzer", verdict: "DANGEROUS" as const, confidence: 0.82, reasoning: "Stalking behavior pattern" },
      { name: "Risk Analyzer", verdict: "SUSPICIOUS" as const, confidence: 0.78, reasoning: "High personal risk indicators" },
    ],
    decisionReasoning: "Stalking-pattern threat with location awareness. Multiple agents converged on DANGEROUS verdict.",
  },
  {
    id: "VIO-003",
    category: "Coercion",
    severity: "SUSPICIOUS" as const,
    confidence: 0.74,
    agent: "Context Analyzer",
    action: "FLAG" as const,
    message: "If you don't do what I say, there will be consequences",
    time: "2024-12-15 12:01:44",
    agents: [
      { name: "Threat Detector", verdict: "SUSPICIOUS" as const, confidence: 0.61, reasoning: "Conditional threat language" },
      { name: "Context Analyzer", verdict: "SUSPICIOUS" as const, confidence: 0.74, reasoning: "Coercive phrasing detected" },
      { name: "Risk Analyzer", verdict: "SAFE" as const, confidence: 0.45, reasoning: "Moderate manipulation pattern" },
    ],
    decisionReasoning: "Coercive language pattern detected. Flagged for human review due to moderate confidence.",
  },
];

const Violations = () => {
  return (
    <AppLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-semibold">Violations</h1>
          <p className="text-sm text-muted-foreground">Flagged and escalated interactions</p>
        </div>

        <div className="space-y-3">
          {violations.map((v) => (
            <Dialog key={v.id}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:border-primary/30 transition-colors">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-muted-foreground">{v.id}</span>
                        <VerdictBadge verdict={v.severity} />
                        <span className="text-sm font-medium">{v.category}</span>
                        <span className="text-xs text-muted-foreground">by {v.agent}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-muted-foreground">{v.confidence.toFixed(2)}</span>
                        <ActionBadge action={v.action} />
                        <span className="text-xs text-muted-foreground">{v.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 truncate">{v.message}</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {v.id} — {v.category} Violation
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Original Message</p>
                    <p className="text-sm font-mono">"{v.message}"</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Agent Outputs</p>
                    <div className="space-y-2">
                      {v.agents.map((a) => (
                        <div key={a.name} className="p-2 border rounded text-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{a.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs">{a.confidence.toFixed(2)}</span>
                              <VerdictBadge verdict={a.verdict} />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground italic">{a.reasoning}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Decision Reasoning</p>
                    <p className="text-sm bg-muted p-2 rounded">{v.decisionReasoning}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Detected: {v.time}</span>
                    <ActionBadge action={v.action} />
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
