"use client";
import { useEffect, useRef, useState } from "react";

/* ---------------- STATE ---------------- */

type SystemState = {
  systemLoad: "LOW" | "MEDIUM" | "HIGH";
  signalDensity: number;
  latency: number;
  anomaly: boolean;
  systemView: boolean;
};

type Payload = {
  id: string;
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

/* ---------------- MOCK ---------------- */

const mock = [
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
];

/* ---------------- COMPONENT ---------------- */

export default function LandingPage() {
  const [sys, setSys] = useState<SystemState>({
    systemLoad: "LOW",
    signalDensity: 1,
    latency: 800,
    anomaly: false,
    systemView: false,
  });

  const [payload, setPayload] = useState<Payload | null>(null);
  const [phase, setPhase] = useState<
    "idle" | "ingest" | "agents" | "decision"
  >("idle");

  const [logs, setLogs] = useState<Payload[]>([]);

  /* ---------------- SIGNAL LAYER (REF = PERF) ---------------- */
  const signalRef = useRef<HTMLDivElement>(null);

  /* ---------------- SYSTEM LOOP ---------------- */
  useEffect(() => {
    const id = setInterval(() => {
      const latency = rand(600, 2500);

      const load =
        latency < 1000 ? "LOW" : latency < 1800 ? "MEDIUM" : "HIGH";

      const density = load === "LOW" ? 1 : load === "MEDIUM" ? 3 : 5;

      setSys((s) => ({
        ...s,
        latency,
        systemLoad: load,
        signalDensity: density,
      }));

      spawnSignals(signalRef.current, density);
    }, 3000);

    return () => clearInterval(id);
  }, []);

  /* ---------------- PIPELINE (REAL PORT) ---------------- */
  useEffect(() => {
    let cancel = false;

    async function loop() {
      while (!cancel) {
        const base = mock[0];
        const p: Payload = {
          ...base,
          id: genId(),
        };

        setPayload(p);

        /* INGEST */
        setPhase("ingest");
        await delay(sys.latency * 0.3);

        /* ZERO STORAGE EFFECT */
        setPayload((prev) =>
          prev ? { ...prev, text: scramble(prev.text) } : prev
        );

        /* AGENTS */
        setPhase("agents");
        await delay(sys.latency * 0.5);

        /* DECISION */
        setPhase("decision");

        setLogs((l) => [p, ...l.slice(0, 4)]);

        await delay(1500);

        setPhase("idle");
        await delay(rand(500, 1200));
      }
    }

    loop();
    return () => {
      cancel = true;
    };
  }, [sys.latency]);

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-white text-black relative">
      {/* SIGNAL LAYER */}
      <div
        ref={signalRef}
        className="fixed inset-0 pointer-events-none opacity-40"
      />

      {/* NAV */}
      <nav className="fixed top-0 w-full h-14 border-b flex justify-between px-6 items-center bg-white/80 backdrop-blur z-50">
        <div className="flex gap-4 items-center">
          <div
            className={`w-3 h-3 ${
              sys.anomaly ? "bg-pink-600" : "bg-green-500"
            } animate-pulse`}
          />
          <span>SafeCom</span>
          <span className="font-mono text-xs">
            LOAD: {sys.systemLoad} | LAT: {sys.latency}
          </span>
        </div>

        <button
          onClick={() =>
            setSys((s) => ({ ...s, systemView: !s.systemView }))
          }
        >
          {sys.systemView ? "SYSTEM VIEW" : "USER VIEW"}
        </button>
      </nav>

      {/* HERO */}
      <section className="pt-24 px-10">
        <h1 className="text-7xl uppercase">
          Harm doesn't wait.
          <br />
          <span className="text-[#C2185B]">Detection</span> shouldn't either.
        </h1>

        {/* MEMORY BUFFER */}
        <div className="border mt-6 p-3 font-mono text-xs w-[400px]">
          <div className="flex justify-between">
            <span>VOLATILE_MEMORY_BUFFER</span>
            <span>
              {phase === "ingest" ? "WRITING" : "FLUSHED"}
            </span>
          </div>

          <div className="mt-2">
            {payload?.text || "[AWAITING]"}
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section className="grid grid-cols-4 gap-6 px-10 py-20">
        <Block active={phase === "ingest"} title="INGEST">
          {payload?.text}
        </Block>

        <Block active={phase === "agents"} title="AGENTS">
          {phase === "agents" ? payload?.t : "---"}
        </Block>

        <Block active={phase === "decision"} title="ACTION">
          {payload?.type}
        </Block>

        <Block title="OUTPUT">{payload?.intent}</Block>
      </section>

      {/* TELEMETRY */}
      <section className="px-10 pb-20">
        <div className="border p-4 font-mono text-xs space-y-2">
          {logs.map((l) => (
            <div key={l.id} className="border-b pb-2">
              <div className="flex justify-between">
                <span>{l.id}</span>
                <span>{l.type}</span>
              </div>
              <div>{l.intent}</div>
              <div className="opacity-60">
                Conf: {Math.round(l.conf * 100)}%
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

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
      <div className="text-xs font-mono mb-2">{title}</div>
      {children}
    </div>
  );
}

function spawnSignals(el: HTMLDivElement | null, density: number) {
  if (!el) return;
  el.innerHTML = "";

  for (let i = 0; i < density * 2; i++) {
    const div = document.createElement("div");
    div.className =
      "absolute h-[1px] w-[200px] bg-gradient-to-r from-transparent via-[#C2185B] to-transparent animate-[flow_3s_linear_infinite]";
    div.style.top = `${Math.random() * 100}vh`;
    div.style.left = `${Math.random() * 100}vw`;
    el.appendChild(div);
  }
}

function scramble(str: string) {
  return str
    .split("")
    .map(() => (Math.random() > 0.5 ? "*" : "#"))
    .join("");
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genId() {
  return "REQ-" + Math.random().toString(36).slice(2, 6).toUpperCase();
}
