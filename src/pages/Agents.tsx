import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { VerdictBadge } from "@/components/StatusBadge";
import { Bot } from "lucide-react";
import { useState } from "react";

const initialAgents = [
  { id: 1, name: "Threat Detector", role: "Detects direct threats, violence, and intimidation", accuracy: 97.2, latency: "12ms", lastSignal: "DANGEROUS" as const, enabled: true },
  { id: 2, name: "Context Analyzer", role: "Analyzes contextual meaning and intent behind messages", accuracy: 94.8, latency: "18ms", lastSignal: "SAFE" as const, enabled: true },
  { id: 3, name: "Risk Analyzer", role: "Calculates composite risk scores from multiple signals", accuracy: 92.1, latency: "8ms", lastSignal: "SUSPICIOUS" as const, enabled: true },
  { id: 4, name: "Pattern Scanner", role: "Identifies behavioral patterns across conversation history", accuracy: 89.4, latency: "24ms", lastSignal: "SAFE" as const, enabled: true },
  { id: 5, name: "Sentiment Profiler", role: "Tracks emotional escalation and sentiment shifts", accuracy: 91.6, latency: "14ms", lastSignal: "SAFE" as const, enabled: false },
];

const Agents = () => {
  const [agents, setAgents] = useState(initialAgents);

  const toggleAgent = (id: number) => {
    setAgents((prev) => prev.map((a) => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Safety Agents</h1>
            <p className="text-sm text-muted-foreground">Configure and monitor detection agents</p>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">{agents.filter(a => a.enabled).length} active</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {agents.map((agent) => (
            <Card key={agent.id} className={`${!agent.enabled ? "opacity-40" : ""} transition-all hover:shadow-md`}>
              <CardContent className="py-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{agent.name}</h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{agent.role}</p>
                    </div>
                  </div>
                  <Switch checked={agent.enabled} onCheckedChange={() => toggleAgent(agent.id)} />
                </div>
                <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Accuracy</p>
                    <p className="font-mono font-semibold text-sm">{agent.accuracy}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Latency</p>
                    <p className="font-mono font-semibold text-sm">{agent.latency}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Last Signal</p>
                    <VerdictBadge verdict={agent.lastSignal} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Agents;
