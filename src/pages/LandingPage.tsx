import { useEffect, useState } from "react";

type SystemState = {
  systemLoad: "LOW" | "MEDIUM" | "HIGH";
  signalDensity: number;
  latency: number;
  anomaly: boolean;
  systemView: boolean;
};

type Payload = {
  text: string;
  intent: string;
  type: "ALLOW" | "WARN" | "FLAG" | "ESCALATE";
  score: number;
  conf: number;
  col: string;
};

const mockPayloads: Payload[] = [
  {
    text: "I know where you live.",
    intent: "Threat",
    type: "ESCALATE",
    score: 9.4,
    conf: 0.94,
    col: "#C2185B",
  },
  {
    text: "You are an idiot.",
    intent: "Harassment",
    type: "WARN",
    score: 5.2,
    conf: 0.79,
    col: "#F59E0B",
  },
  {
    text: "Let's meet tomorrow",
    intent: "Safe",
    type: "ALLOW",
    score: 1.2,
    conf: 0.99,
    col: "#10B981",
  },
];

export default function LandingPage() {
  const [state, setState] = useState<SystemState>({
    systemLoad: "LOW",
    signalDensity: 1,
    latency: 800,
    anomaly: false,
    systemView: false,
  });

  const [currentPayload, setCurrentPayload] = useState<Payload | null>(null);
  const [phase, setPhase] = useState<
    "idle" | "ingest" | "analyze" | "decision"
  >("idle");

  /* ---------------- SYSTEM LOOP ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      const latency = Math.floor(Math.random() * 2000) + 600;

      const systemLoad =
        latency < 1000 ? "LOW" : latency < 1800 ? "MEDIUM" : "HIGH";

      const signalDensity =
        systemLoad === "LOW" ? 1 : systemLoad === "MEDIUM" ? 3 : 5;

      setState((prev) => ({
        ...prev,
        latency,
        systemLoad,
        signalDensity,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* ---------------- PIPELINE LOOP ---------------- */
  useEffect(() => {
    let cancelled = false;

    async function run() {
      while (!cancelled) {
        const payload =
          mockPayloads[Math.floor(Math.random() * mockPayloads.length)];

        setCurrentPayload(payload);

        // INGEST
        setPhase("ingest");
        await delay(state.latency * 0.3);

        // ANALYZE
        setPhase("analyze");
        await delay(state.latency * 0.4);

        // DECISION
        setPhase("decision");
        await delay(1500);

        setPhase("idle");
        await delay(800);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [state.latency]);

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      <GlobalSignals density={state.signalDensity} />

      {/* NAV */}
      <nav className="fixed top-0 w-full h-14 border-b flex items-center justify-between px-6 bg-white/80 backdrop-blur z-50">
        <div className="flex gap-4 items-center">
          <div
            className={`w-3 h-3 rounded-full ${
              state.anomaly ? "bg-pink-600" : "bg-green-500"
            } animate-pulse`}
          />
          <span className="font-semibold uppercase">SafeCom</span>
          <span className="font-mono text-xs opacity-60">
            LOAD: {state.systemLoad} | LAT: {state.latency}ms
          </span>
        </div>

        <button
          onClick={() =>
            setState((s) => ({ ...s, systemView: !s.systemView }))
          }
          className="border px-3 py-1 font-mono text-xs"
        >
          {state.systemView ? "SYSTEM VIEW" : "USER VIEW"}
        </button>
      </nav>

      {/* HERO */}
      <section className="pt-20 px-8 min-h-screen flex flex-col justify-center">
        <h1 className="text-6xl font-bold tracking-tight leading-tight uppercase">
          Harm doesn't wait.
          <br />
          <span className="text-[#C2185B]">Detection</span> shouldn't either.
        </h1>

        <div className="mt-10 border p-4 font-mono text-xs w-[400px]">
          <div className="mb-2 opacity-60">PIPELINE STATUS</div>

          {phase === "ingest" && <span>INGESTING PAYLOAD...</span>}
          {phase === "analyze" && <span>RUNNING AGENTS...</span>}
          {phase === "decision" && <span>FINALIZING DECISION...</span>}
          {phase === "idle" && <span>IDLE</span>}
        </div>
      </section>

      {/* PIPELINE */}
      <section className="px-8 py-20 grid grid-cols-4 gap-6">
        <PipelineBlock title="INGEST" active={phase === "ingest"}>
          {state.systemView
            ? "[0x9A, 0xFF, 0x12]"
            : currentPayload?.text || "..."}
        </PipelineBlock>

        <PipelineBlock title="AGENTS" active={phase === "analyze"}>
          {phase === "analyze" ? "Analyzing..." : "---"}
        </PipelineBlock>

        <PipelineBlock title="DECISION" active={phase === "decision"}>
          {currentPayload?.type || "---"}
        </PipelineBlock>

        <PipelineBlock title="OUTPUT">
          {currentPayload?.intent || "---"}
        </PipelineBlock>
      </section>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function PipelineBlock({
  title,
  active,
  children,
}: {
  title: string;
  active?: boolean;
  children?: any;
}) {
  return (
    <div
      className={`border p-4 ${
        active ? "shadow-[4px_4px_0_#C2185B]" : ""
      }`}
    >
      <div className="text-xs font-mono mb-2">{title}</div>
      <div className="font-mono text-sm">{children}</div>
    </div>
  );
}

function GlobalSignals({ density }: { density: number }) {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-40">
      {Array.from({ length: density * 2 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-[1px] w-[200px] bg-gradient-to-r from-transparent via-[#C2185B] to-transparent animate-[flow_3s_linear_infinite]"
          style={{
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- UTILS ---------------- */

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
