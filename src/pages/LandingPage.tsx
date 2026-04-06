"use client";
import { useEffect, useRef, useState } from "react";

/* ---------------- TYPES ---------------- */

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
  t: string;
  c: string;
  r: string;
  col: string;
  note?: string;
};

/* ---------------- MOCK DATA ---------------- */

const mockPayloads: Payload[] = [
  {
    text: "I know where you live.",
    intent: "Intimidation",
    type: "ESCALATE",
    score: 9.4,
    conf: 0.94,
    t: "DANGEROUS",
    c: "SUSPICIOUS",
    r: "DANGEROUS",
    col: "#C2185B",
  },
  {
    text: "You are an idiot.",
    intent: "Harassment",
    type: "WARN",
    score: 5.2,
    conf: 0.79,
    t: "SUSPICIOUS",
    c: "SUSPICIOUS",
    r: "SAFE",
    col: "#F59E0B",
  },
  {
    text: "Let's meet tomorrow.",
    intent: "Safe",
    type: "ALLOW",
    score: 1.2,
    conf: 0.99,
    t: "SAFE",
    c: "SAFE",
    r: "SAFE",
    col: "#10B981",
  },
];

/* ---------------- MAIN COMPONENT ---------------- */

export default function LandingPage() {
  const [state, setState] = useState<SystemState>({
    systemLoad: "LOW",
    signalDensity: 1,
    latency: 900,
    anomaly: false,
    systemView: false,
  });

  const [phase, setPhase] = useState<
    "idle" | "ingest" | "agents" | "decision"
  >("idle");

  const [payload, setPayload] = useState<Payload | null>(null);
  const [logs, setLogs] = useState<any[]>([]);

  /* ---------------- SYSTEM LOOP ---------------- */

  useEffect(() => {
    const interval = setInterval(() => {
      const latency = rand(600, 2500);

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

      if (Math.random() < 0.05) triggerAnomaly();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* ---------------- PIPELINE LOOP ---------------- */

  useEffect(() => {
    let cancelled = false;

    async function run() {
      while (!cancelled) {
        const p = pick(mockPayloads);
        setPayload(p);

        setPhase("ingest");
        await delay(state.latency * 0.3);

        setPhase("agents");
        await delay(state.latency * 0.4);

        setPhase("decision");

        addLog(p);

        await delay(1500);

        setPhase("idle");
        await delay(rand(600, 1200));
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [state.latency]);

  /* ---------------- FUNCTIONS ---------------- */

  function triggerAnomaly() {
    setState((s) => ({ ...s, anomaly: true }));

    setTimeout(() => {
      setState((s) => ({ ...s, anomaly: false }));
    }, 2500);
  }

  function addLog(p: Payload) {
    const entry = {
      id: Math.random().toString(36).slice(2),
      payload: p,
      time: new Date().toLocaleTimeString(),
    };

    setLogs((prev) => [entry, ...prev.slice(0, 4)]);
  }

  /* ---------------- UI ---------------- */

  return (
    <div
      className={`min-h-screen bg-white text-black ${
        state.anomaly ? "animate-pulse" : ""
      }`}
    >
      <GlobalSignals density={state.signalDensity} />

      {/* NAV */}
      <nav className="fixed top-0 w-full h-14 border-b flex justify-between px-6 items-center bg-white/80 backdrop-blur z-50">
        <div className="flex gap-4 items-center">
          <div
            className={`w-3 h-3 ${
              state.anomaly ? "bg-pink-600" : "bg-green-500"
            } animate-pulse`}
          />
          <span className="uppercase font-semibold">SafeCom</span>
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
      <section className="pt-24 px-10 min-h-screen flex flex-col justify-center">
        <h1 className="text-7xl font-bold tracking-tight uppercase">
          Harm doesn't wait.
          <br />
          <span className="text-[#C2185B]">Detection</span> shouldn't either.
        </h1>

        <SystemStatus phase={phase} />
      </section>

      {/* PIPELINE */}
      <section className="grid grid-cols-4 gap-6 px-10 py-20">
        <Block title="INGEST" active={phase === "ingest"}>
          {state.systemView ? "[0x9A, 0xFF]" : payload?.text}
        </Block>

        <Block title="AGENTS" active={phase === "agents"}>
          {phase === "agents" ? "Analyzing..." : "---"}
        </Block>

        <Block title="DECISION" active={phase === "decision"}>
          {payload?.type}
        </Block>

        <Block title="OUTPUT">{payload?.intent}</Block>
      </section>

      {/* TELEMETRY */}
      <section className="px-10 pb-20">
        <h2 className="text-xl font-bold mb-4 uppercase">
          Live Telemetry
        </h2>

        <div className="border p-4 font-mono text-xs space-y-3">
          {logs.map((log) => (
            <TelemetryItem key={log.id} log={log} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Block({
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
      <div className="font-mono text-xs mb-2">{title}</div>
      <div className="font-mono">{children}</div>
    </div>
  );
}

function SystemStatus({ phase }: { phase: string }) {
  return (
    <div className="mt-8 border p-4 font-mono text-xs w-[400px]">
      {phase === "ingest" && "INGESTING"}
      {phase === "agents" && "RUNNING AGENTS"}
      {phase === "decision" && "FINALIZING"}
      {phase === "idle" && "IDLE"}
    </div>
  );
}

function TelemetryItem({ log }: any) {
  return (
    <div className="border-b pb-2">
      <div className="flex justify-between">
        <span>{log.time}</span>
        <span>{log.payload.type}</span>
      </div>
      <div>{log.payload.intent}</div>
      <div className="opacity-60">
        Conf: {Math.round(log.payload.conf * 100)}%
      </div>
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

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
