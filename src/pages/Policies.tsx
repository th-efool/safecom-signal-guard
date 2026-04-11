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
        <div className="flex items-end justify-between border-b border-neutral-200 pb-4">
          <div>
            <h1 className="text-xl font-semibold text-neutral-900">
              Policy Engine
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Rule-based execution layer
            </p>
          </div>

          <button className="border border-neutral-300 px-3 py-1 text-xs rounded-md flex items-center gap-1 hover:bg-neutral-100 transition">
            <Plus className="h-3.5 w-3.5" />
            Add Policy
          </button>
        </div>

        {/* RULES */}
        <div className="space-y-2">

          {policies.map((policy) => (
            <div
              key={policy.id}
              className={`
                flex justify-between items-center
                border border-neutral-200 rounded-md p-4
                bg-white transition
                ${policy.enabled ? "" : "opacity-50"}
              `}
            >

              {/* LEFT SIDE */}
              <div className="flex items-center gap-3 text-sm">

                {/* IF */}
                <span className="text-xs text-neutral-500">
                  IF
                </span>

                <span className="text-neutral-900">
                  {policy.condition}
                </span>

                <ArrowRight className="h-4 w-4 text-neutral-400" />

                {/* THEN */}
                <span className="text-xs text-neutral-500">
                  THEN
                </span>

                <ActionBadge action={policy.action} />

              </div>

              {/* RIGHT CONTROL */}
              <Switch
                checked={policy.enabled}
                onCheckedChange={() => togglePolicy(policy.id)}
              />

            </div>
          ))}

        </div>
      </div>
    </AppLayout>
  );
};

export default Policies;
