import { AppLayout } from "@/components/AppLayout";
import { VerdictBadge, ActionBadge } from "@/components/StatusBadge";
import { Shield, AlertTriangle, TrendingUp, Activity } from "lucide-react";

const riskSurface = [
  { label: "Harassment", value: 12, color: "bg-black" },
  { label: "Threat", value: 8, color: "bg-danger" },
  { label: "Coercion", value: 5, color: "bg-warning" },
  { label: "Stalking", value: 3, color: "bg-black/40" },
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

const statCards = [
  {
    label: "Threat Level",
    value: "SAFE",
    valueClass: "text-safe",
    icon: Shield,
    subtle: "No active threats",
  },
  {
    label: "Governance Confidence",
    value: "96.4%",
    valueClass: "text-black",
    icon: Activity,
    subtle: "+2.1% from last hour",
  },
  {
    label: "Active Threats",
    value: "3",
    valueClass: "text-black",
    icon: AlertTriangle,
    subtle: "2 flagged, 1 escalated",
  },
  {
    label: "Escalation Rate",
    value: "0.7%",
    valueClass: "text-black",
    icon: TrendingUp,
    subtle: "Below threshold",
  },
];

const Dashboard = () => {
  const total =
    signalDistribution.safe +
    signalDistribution.suspicious +
    signalDistribution.dangerous;

  return (
    <AppLayout>
      <div className="space-y-10">

        {/* HEADER */}
        <div className="flex items-end justify-between border-b border-black pb-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight uppercase">
              System Posture
            </h1>
            <p className="font-mono text-xs text-black/60 mt-1">
              &gt; GLOBAL SAFETY STATE / LIVE SIGNAL OVERVIEW
            </p>
          </div>

          <span className="font-mono text-xs border border-black px-2 py-1">
            STATUS: ONLINE
          </span>
        </div>

        {/* SYSTEM METRICS STRIP */}
        <div className="grid grid-cols-4 border border-black">
          {statCards.map((card, i) => (
            <div
              key={card.label}
              className={`p-4 ${
                i !== statCards.length - 1 ? "border-r border-black" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase text-black/50">
                  {card.label}
                </span>
                <card.icon className="w-4 h-4" />
              </div>

              <div className={`text-2xl font-semibold ${card.valueClass}`}>
                {card.value}
              </div>

              <p className="font-mono text-[10px] text-black/50 mt-1">
                {card.subtle}
              </p>
            </div>
          ))}
        </div>

        {/* PIPELINE SECTION */}
        <div className="grid grid-cols-3 gap-6">

          {/* STEP 1 */}
          <div className="brutal-border brutal-shadow p-5">
            <div className="font-mono text-[10px] mb-3 text-black/50">
              01 / RISK SURFACE
            </div>

            {riskSurface.map((r) => (
              <div key={r.label} className="mb-3">
                <div className="flex justify-between text-xs">
                  <span>{r.label}</span>
                  <span className="font-mono">{r.value}</span>
                </div>

                <div className="h-[2px] bg-black/10 mt-1">
                  <div
                    className={`${r.color} h-full`}
                    style={{ width: `${(r.value / 20) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* STEP 2 */}
          <div className="brutal-border brutal-shadow p-5">
            <div className="font-mono text-[10px] mb-3 text-black/50">
              02 / SIGNAL DISTRIBUTION
            </div>

            {[
              { label: "Safe", value: signalDistribution.safe },
              { label: "Suspicious", value: signalDistribution.suspicious },
              { label: "Dangerous", value: signalDistribution.dangerous },
            ].map((s) => (
              <div key={s.label} className="flex justify-between mb-2 text-sm">
                <span>{s.label}</span>
                <span className="font-mono">{s.value}</span>
              </div>
            ))}

            <div className="flex h-1 mt-3">
              <div
                className="bg-safe"
                style={{ width: `${(signalDistribution.safe / total) * 100}%` }}
              />
              <div
                className="bg-warning"
                style={{
                  width: `${(signalDistribution.suspicious / total) * 100}%`,
                }}
              />
              <div
                className="bg-danger"
                style={{
                  width: `${(signalDistribution.dangerous / total) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* STEP 3 */}
          <div className="brutal-border brutal-shadow p-5">
            <div className="font-mono text-[10px] mb-3 text-black/50">
              03 / AGENT ACTIVITY
            </div>

            {agents.map((a) => (
              <div
                key={a.name}
                className="flex justify-between items-center mb-3"
              >
                <div>
                  <p className="text-sm">{a.name}</p>
                  <p className="font-mono text-[10px] text-black/50">
                    {a.lastSignal}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <VerdictBadge verdict={a.state} />
                  <div className="w-12 h-[2px] bg-black/10">
                    <div
                      className="bg-black h-full"
                      style={{ width: `${a.activity}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TELEMETRY LOG */}
        <div className="brutal-border brutal-shadow">

          <div className="border-b border-black p-3 flex justify-between font-mono text-xs uppercase">
            <span>Live Signal Trace</span>
            <span className="animate-blink">_</span>
          </div>

          <div className="p-3 space-y-3">
            {signalsFeed.map((s, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b border-black/10 pb-2"
              >
                <div className="flex items-center gap-3">
                  <VerdictBadge verdict={s.severity} />

                  <div>
                    <p className="text-sm">{s.issue}</p>
                    <p className="font-mono text-[10px] text-black/50">
                      {s.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ActionBadge action={s.action} />
                  <span className="font-mono text-xs text-black/50">
                    {s.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppLayout>
  );
};

export default Dashboard;
