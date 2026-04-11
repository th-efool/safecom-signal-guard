import { AppLayout } from "@/components/AppLayout";
import { VerdictBadge, ActionBadge } from "@/components/StatusBadge";
import { Shield, AlertTriangle, TrendingUp, Activity } from "lucide-react";

/* ---------------- DATA ---------------- */

const riskSurface = [
  { label: "Harassment", value: 12 },
  { label: "Threat", value: 8 },
  { label: "Coercion", value: 5 },
  { label: "Stalking", value: 3 },
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

const getStatusColor = (value: string) => {
  if (value === "SAFE") return "text-emerald-600";
  if (value === "SUSPICIOUS") return "text-yellow-600";
  if (value === "DANGEROUS") return "text-red-600";
  return "text-neutral-900";
};

/* ---------------- COMPONENT ---------------- */

const Dashboard = () => {
  const total =
    signalDistribution.safe +
    signalDistribution.suspicious +
    signalDistribution.dangerous;

  return (
    <AppLayout>
      <div className="space-y-8 bg-white text-neutral-900">

        {/* HEADER */}
        <div className="flex items-end justify-between border-b border-neutral-200 pb-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              System Posture
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Global safety state / live signal overview
            </p>
          </div>

          <span className="text-xs border border-neutral-300 px-2 py-1 text-neutral-600">
            STATUS: ONLINE
          </span>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Threat Level", value: "SAFE", icon: Shield, subtle: "No active threats" },
            { label: "Governance Confidence", value: "96.4%", icon: Activity, subtle: "+2.1% from last hour" },
            { label: "Active Threats", value: "3", icon: AlertTriangle, subtle: "2 flagged, 1 escalated" },
            { label: "Escalation Rate", value: "0.7%", icon: TrendingUp, subtle: "Below threshold" },
          ].map((card) => (
            <div key={card.label} className="p-4 bg-neutral-50 border border-neutral-200 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-neutral-500 tracking-wide">
                  {card.label}
                </span>
                <card.icon className="w-4 h-4 text-neutral-400" />
              </div>

              <div className={`text-2xl font-semibold ${getStatusColor(card.value)}`}>
                {card.value}
              </div>

              <p className="text-xs text-neutral-500 mt-1">
                {card.subtle}
              </p>
            </div>
          ))}
        </div>

        {/* PIPELINE */}
        <div>
          <h2 className="text-sm text-neutral-500 mb-3">
            Signal Pipeline
          </h2>

          <div className="grid grid-cols-3 gap-4">

            <div className="bg-neutral-50 border border-neutral-200 p-5 rounded-md">
              <div className="text-[11px] text-neutral-500 mb-4">Risk Surface</div>

              {riskSurface.map((r) => (
                <div key={r.label} className="mb-4">
                  <div className="flex justify-between text-sm">
                    <span>{r.label}</span>
                    <span className="text-neutral-500">{r.value}</span>
                  </div>

                  <div className="h-[2px] bg-neutral-200 mt-1">
                    <div
                      className="bg-neutral-600 h-full"
                      style={{ width: `${(r.value / 20) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-neutral-50 border border-neutral-200 p-5 rounded-md">
              <div className="text-[11px] text-neutral-500 mb-4">Signal Distribution</div>

              {[
                { label: "Safe", value: signalDistribution.safe },
                { label: "Suspicious", value: signalDistribution.suspicious },
                { label: "Dangerous", value: signalDistribution.dangerous },
              ].map((s) => (
                <div key={s.label} className="flex justify-between mb-2 text-sm">
                  <span>{s.label}</span>
                  <span className="text-neutral-500">{s.value}</span>
                </div>
              ))}

              <div className="flex h-1 mt-4">
                <div className="bg-emerald-500" style={{ width: `${(signalDistribution.safe / total) * 100}%` }} />
                <div className="bg-yellow-500" style={{ width: `${(signalDistribution.suspicious / total) * 100}%` }} />
                <div className="bg-red-500" style={{ width: `${(signalDistribution.dangerous / total) * 100}%` }} />
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 p-5 rounded-md">
              <div className="text-[11px] text-neutral-500 mb-4">Agent Activity</div>

              {agents.map((a) => (
                <div key={a.name} className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm">{a.name}</p>
                    <p className="text-xs text-neutral-500">{a.lastSignal}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <VerdictBadge verdict={a.state} />
                    <div className="w-12 h-[2px] bg-neutral-200">
                      <div className="bg-neutral-600 h-full" style={{ width: `${a.activity}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* TELEMETRY */}
        <div className="border border-neutral-300 bg-white">

          <div className="border-b border-neutral-200 p-3 flex justify-between text-xs text-neutral-500">
            <span>Live Signal Trace</span>
            <span className="animate-pulse">●</span>
          </div>

          <div className="p-3 space-y-3">
            {signalsFeed.map((s, i) => (
              <div key={i} className="flex justify-between items-center border-b border-neutral-200 pb-2">
                <div className="flex items-center gap-3">
                  <VerdictBadge verdict={s.severity} />
                  <div>
                    <p className="text-sm">{s.issue}</p>
                    <p className="text-xs text-neutral-500">{s.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ActionBadge action={s.action} />
                  <span className="text-xs text-neutral-500">{s.time}</span>
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
