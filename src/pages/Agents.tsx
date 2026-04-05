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
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-semibold">Safety Agents</h1>
          <p className="text-sm text-muted-foreground">Configure and monitor detection agents</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {agents.map((agent) => (
            <Card key={agent.id} className={`${!agent.enabled ? "opacity-50" : ""} transition-opacity`}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold text-sm">{agent.name}</h3>
                      <p className="text-xs text-muted-foreground">{agent.role}</p>
                    </div>
                  </div>
                  <Switch checked={agent.enabled} onCheckedChange={() => toggleAgent(agent.id)} />
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">Accuracy</p>
                    <p className="font-mono font-semibold">{agent.accuracy}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Latency</p>
                    <p className="font-mono font-semibold">{agent.latency}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Signal</p>
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
