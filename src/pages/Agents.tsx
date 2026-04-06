import { AppLayout } from "@/components/AppLayout";
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
    setAgents((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, enabled: !a.enabled } : a
      )
    );
  };

  return (
    <AppLayout>
      <div className="space-y-10">

        {/* HEADER */}
        <div className="flex items-end justify-between border-b border-black pb-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight uppercase">
              Agent Control Layer
            </h1>
            <p className="font-mono text-xs text-black/60 mt-1">
              &gt; ENABLE / DISABLE SIGNAL PROCESSING AGENTS
            </p>
          </div>

          <span className="font-mono text-xs border border-black px-2 py-1">
            ACTIVE: {agents.filter(a => a.enabled).length}
          </span>
        </div>

        {/* AGENT GRID */}
        <div className="grid grid-cols-2 gap-6">

          {agents.map((agent) => (
            <div
              key={agent.id}
              className={`
                brutal-border brutal-shadow p-5 bg-white
                transition-all
                ${agent.enabled ? "" : "opacity-40"}
              `}
            >
              {/* TOP */}
              <div className="flex items-start justify-between mb-4">

                <div className="flex items-start gap-3">

                  {/* NODE ICON */}
                  <div className={`
                    w-9 h-9 flex items-center justify-center border border-black
                    ${agent.enabled ? "node-active" : ""}
                  `}>
                    <Bot className="w-4 h-4" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm uppercase tracking-tight">
                      {agent.name}
                    </h3>
                    <p className="font-mono text-[11px] text-black/60 leading-relaxed">
                      {agent.role}
                    </p>
                  </div>
                </div>

                {/* CONTROL */}
              <Switch
                checked={agent.enabled}
                onCheckedChange={() => toggleAgent(agent.id)}
                className="
                  data-[state=checked]:bg-black 
                  data-[state=unchecked]:bg-white 
                  border border-black
                  relative
                "
              />
              </div>



              {/* METRICS */}
              <div className="grid grid-cols-3 gap-4 border-t border-black pt-3">

                <div>
                  <p className="font-mono text-[10px] uppercase text-black/50 mb-1">
                    Accuracy
                  </p>
                  <p className="font-mono text-sm font-semibold">
                    {agent.accuracy}%
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase text-black/50 mb-1">
                    Latency
                  </p>
                  <p className="font-mono text-sm font-semibold">
                    {agent.latency}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase text-black/50 mb-1">
                    Signal
                  </p>
                  <VerdictBadge verdict={agent.lastSignal} />
                </div>
              </div>

              {/* SYSTEM FOOTER */}
              <div className="mt-4 pt-3 border-t border-black/20 flex justify-between font-mono text-[10px] text-black/50">
                <span>ID: AGT-{agent.id.toString().padStart(3, "0")}</span>
                <span>{agent.enabled ? "ONLINE" : "OFFLINE"}</span>
              </div>
            </div>
          ))}

        </div>
      </div>
    </AppLayout>
  );
};

export default Agents;
