import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VerdictBadge, ActionBadge } from "@/components/StatusBadge";
import { Shield, AlertTriangle, TrendingUp, Activity, Bot } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const riskSurface = [
  { label: "Harassment", value: 12, color: "bg-primary" },
  { label: "Threat", value: 8, color: "bg-danger" },
  { label: "Coercion", value: 5, color: "bg-warning" },
  { label: "Stalking", value: 3, color: "bg-muted-foreground" },
];

const signalDistribution = {
  safe: 847,
  suspicious: 42,
  dangerous: 6,
};

const agents = [
  { name: "Threat Detector", state: "SAFE" as const, lastSignal: "2m ago", activity: 94 },
  { name: "Context Analyzer", state: "SAFE" as const, lastSignal: "1m ago", activity: 88 },
  { name: "Risk Analyzer", state: "SUSPICIOUS" as const, lastSignal: "30s ago", activity: 76 },
  { name: "Pattern Scanner", state: "SAFE" as const, lastSignal: "5m ago", activity: 62 },
];

const signalsFeed = [
  { issue: "Threatening language detected", category: "Threat", severity: "DANGEROUS" as const, action: "ESCALATE" as const, time: "12:04:32" },
  { issue: "Repeated unwanted contact", category: "Stalking", severity: "SUSPICIOUS" as const, action: "FLAG" as const, time: "12:03:18" },
  { issue: "Coercive phrasing identified", category: "Coercion", severity: "SUSPICIOUS" as const, action: "WARN" as const, time: "12:01:44" },
  { issue: "Aggressive tone pattern", category: "Harassment", severity: "SUSPICIOUS" as const, action: "FLAG" as const, time: "11:58:21" },
  { issue: "Normal conversation", category: "—", severity: "SAFE" as const, action: "ALLOW" as const, time: "11:57:05" },
];

const Dashboard = () => {
  const total = signalDistribution.safe + signalDistribution.suspicious + signalDistribution.dangerous;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold">System Posture</h1>
          <p className="text-sm text-muted-foreground">Overall safety state and operational trends</p>
        </div>

        {/* System State Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">Threat Level</span>
                <Shield className="h-4 w-4 text-safe" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-safe">SAFE</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">Governance Confidence</span>
                <Activity className="h-4 w-4 text-primary" />
              </div>
              <span className="text-2xl font-bold">96.4%</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">Active Threats</span>
                <AlertTriangle className="h-4 w-4 text-warning" />
              </div>
              <span className="text-2xl font-bold">3</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">Escalation Rate</span>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-2xl font-bold">0.7%</span>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Risk Surface */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Risk Surface</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {riskSurface.map((r) => (
                <div key={r.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{r.label}</span>
                    <span className="font-mono font-medium">{r.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${r.color}`} style={{ width: `${(r.value / 20) * 100}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Signal Distribution */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Signal Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Safe", value: signalDistribution.safe, cls: "bg-safe" },
                { label: "Suspicious", value: signalDistribution.suspicious, cls: "bg-warning" },
                { label: "Dangerous", value: signalDistribution.dangerous, cls: "bg-danger" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full ${s.cls}`} />
                    <span className="text-sm">{s.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium">{s.value}</span>
                    <span className="text-[10px] text-muted-foreground">({((s.value / total) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
              <div className="h-2 rounded-full bg-muted overflow-hidden flex mt-2">
                <div className="bg-safe h-full" style={{ width: `${(signalDistribution.safe / total) * 100}%` }} />
                <div className="bg-warning h-full" style={{ width: `${(signalDistribution.suspicious / total) * 100}%` }} />
                <div className="bg-danger h-full" style={{ width: `${(signalDistribution.dangerous / total) * 100}%` }} />
              </div>
            </CardContent>
          </Card>

          {/* Agent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Bot className="h-4 w-4" /> Agent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {agents.map((a) => (
                <div key={a.name} className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{a.name}</p>
                    <p className="text-[10px] text-muted-foreground">{a.lastSignal}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <VerdictBadge verdict={a.state} />
                    <span className="text-xs font-mono text-muted-foreground w-8 text-right">{a.activity}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Safety Signals Feed */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Safety Signals Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {signalsFeed.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <VerdictBadge verdict={s.severity} />
                    <div className="min-w-0">
                      <p className="text-sm truncate">{s.issue}</p>
                      <p className="text-[10px] text-muted-foreground">{s.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <ActionBadge action={s.action} />
                    <span className="text-xs font-mono text-muted-foreground">{s.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
