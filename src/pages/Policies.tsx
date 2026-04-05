import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Plus } from "lucide-react";

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
    setPolicies((prev) => prev.map((p) => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Policies</h1>
            <p className="text-sm text-muted-foreground">Safety rules that influence thresholds and escalation</p>
          </div>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" /> Add Policy
          </Button>
        </div>

        <div className="space-y-3">
          {policies.map((policy) => (
            <Card key={policy.id} className={`${!policy.enabled ? "opacity-50" : ""} transition-opacity`}>
              <CardContent className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-xs font-mono px-2 py-1 bg-muted rounded">IF</div>
                  <span className="text-sm">{policy.condition}</span>
                  <div className="text-xs font-mono px-2 py-1 bg-muted rounded">THEN</div>
                  <ActionBadge action={policy.action} />
                </div>
                <Switch checked={policy.enabled} onCheckedChange={() => togglePolicy(policy.id)} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Policies;
