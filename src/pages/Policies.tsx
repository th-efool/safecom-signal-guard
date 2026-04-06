import { AppLayout } from "@/components/AppLayout";
import { ActionBadge } from "@/components/StatusBadge";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";

const initialPolicies = [
  { id: 1, condition: "Threat confidence > 0.85", action: "ESCALATE" as const, enabled: true },
  { id: 2, condition: "Any agent verdict = DANGEROUS", action: "ESCALATE" as const, enabled: true },
  { id: 3, condition: "Coercion confidence > 0.60", action: "FLAG" as const, enabled: true },
  { id: 4, condition: "Harassment pattern detected", action: "WARN" as const, enabled: true },
  { id: 5, condition: "Stalking signals across 3+ messages", action: "ESCALATE" as const, enabled: true },
  { id: 6, condition: "Repeated flagged user (>3 violations)", action: "ESCALATE" as const, enabled: false },
];

const Policies = () => {
  const [policies, setPolicies] = useState(initialPolicies);

  const togglePolicy = (id: number) => {
    setPolicies((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, enabled: !p.enabled } : p
      )
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-end justify-between border-b border-black pb-4">
          <div>
            <h1 className="text-xl font-semibold uppercase">
              Policy Engine
            </h1>
            <p className="font-mono text-xs text-black/60 mt-1">
              &gt; RULE-BASED EXECUTION LAYER
            </p>
          </div>

          <button className="border border-black px-3 py-1 text-xs font-mono flex items-center gap-1 hover:bg-black hover:text-white transition">
            <Plus className="h-3.5 w-3.5" />
            ADD POLICY
          </button>
        </div>

        {/* RULES */}
        <div className="space-y-3">

          {policies.map((policy) => (
            <div
              key={policy.id}
              className={`
                border-2 border-black bg-white p-4 flex justify-between items-center
                transition
                ${policy.enabled ? "" : "opacity-40 grayscale"}
                hover:shadow-[4px_4px_0px_black]
              `}
            >

              {/* LEFT FLOW */}
              <div className="flex items-center gap-3 font-mono text-sm">

                <span className="border border-black px-2 py-1 text-[10px]">
                  IF
                </span>

                <span>{policy.condition}</span>

                <ArrowRight className="h-4 w-4 text-black/60" />

                <span className="border border-black px-2 py-1 text-[10px]">
                  THEN
                </span>

                <ActionBadge action={policy.action} />

              </div>

              {/* RIGHT CONTROL */}
              <Switch
                checked={policy.enabled}
                onCheckedChange={() => togglePolicy(policy.id)}
                className="border border-black data-[state=checked]:bg-black"
              />

            </div>
          ))}

        </div>
      </div>
    </AppLayout>
  );
};

export default Policies;
