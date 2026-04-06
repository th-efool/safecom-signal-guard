import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const SettingsPage = () => {
  const [escalationThreshold, setEscalationThreshold] = useState([85]);
  const [flagThreshold, setFlagThreshold] = useState([60]);
  const [warnThreshold, setWarnThreshold] = useState([40]);

  return (
    <AppLayout>
      <div className="space-y-8 max-w-3xl">

        {/* HEADER */}
        <div className="border-b border-black pb-4">
          <h1 className="text-2xl font-semibold uppercase">
            System Configuration
          </h1>
          <p className="font-mono text-xs text-black/60 mt-1">
            &gt; CONTROL SURFACE · THRESHOLDS · EXECUTION RULES
          </p>
        </div>

        {/* API */}
        <div className="border-2 border-black bg-white p-5 space-y-4">

          <div className="font-mono text-[10px] text-black/50">
            API CONNECTION
          </div>

          <div>
            <Label className="text-[10px] uppercase text-black/50">
              Model Endpoint
            </Label>
            <Input
              value="https://api.groq.com/v1/chat/completions"
              readOnly
              className="font-mono text-xs h-9 border border-black bg-white"
            />
          </div>

          <div>
            <Label className="text-[10px] uppercase text-black/50">
              API Key
            </Label>
            <Input
              type="password"
              value="gsk_••••••••••••••••"
              readOnly
              className="font-mono text-xs h-9 border border-black bg-white"
            />
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-black/20">
            <div>
              <p className="text-sm">Webhook Notifications</p>
              <p className="text-[11px] text-black/50">
                External alert dispatch
              </p>
            </div>

            <Switch className="data-[state=checked]:bg-black border border-black" defaultChecked />
          </div>
        </div>

        {/* THRESHOLDS */}
        <div className="border-2 border-black bg-white p-5 space-y-6">

          <div className="font-mono text-[10px] text-black/50">
            THRESHOLD ENGINE
          </div>

          {/* ESCALATE */}
          <div>
            <div className="flex justify-between mb-1">
              <Label className="text-[10px] uppercase text-black/50">
                Escalation
              </Label>
              <span className="font-mono text-sm">
                {escalationThreshold[0]}%
              </span>
            </div>

          <Slider
            value={escalationThreshold}
            onValueChange={setEscalationThreshold}
            max={100}
            step={1}
            className="
              [&_[data-orientation=horizontal]]:h-2
              [&_[data-orientation=horizontal]]:bg-black/20
              [&_[data-orientation=horizontal]>span]:bg-[#C2185B]
              [&_[role=slider]]:bg-[#C2185B]
              [&_[role=slider]]:border-2
              [&_[role=slider]]:border-black
            "
          />
          </div>

          {/* FLAG */}
          <div>
            <div className="flex justify-between mb-1">
              <Label className="text-[10px] uppercase text-black/50">
                Flag
              </Label>
              <span className="font-mono text-sm">
                {flagThreshold[0]}%
              </span>
            </div>

          <Slider
            value={flagThreshold}
            onValueChange={setFlagThreshold}
            max={100}
            step={1}
            className="
              [&_[data-orientation=horizontal]]:h-2
              [&_[data-orientation=horizontal]]:bg-black/20
              [&_[data-orientation=horizontal]>span]:bg-[#F59E0B]
              [&_[role=slider]]:bg-[#F59E0B]
              [&_[role=slider]]:border-2
              [&_[role=slider]]:border-black
            "
          />

          {/* WARN */}
          <div>
            <div className="flex justify-between mb-1">
              <Label className="text-[10px] uppercase text-black/50">
                Warn
              </Label>
              <span className="font-mono text-sm">
                {warnThreshold[0]}%
              </span>
            </div>

            <Slider
              value={warnThreshold}
              onValueChange={setWarnThreshold}
              max={100}
              step={1}
              className="[&_[role=slider]]:bg-[#10B981]"
            />
          </div>

        </div>

        {/* SYSTEM FLAGS */}
        <div className="border-2 border-black bg-white p-5 space-y-4">

          <div className="font-mono text-[10px] text-black/50">
            SYSTEM FLAGS
          </div>

          {[
            {
              title: "Real-time Processing",
              desc: "Process messages instantly",
              checked: true,
            },
            {
              title: "Auto-Escalation",
              desc: "Escalate high-risk signals",
              checked: true,
            },
            {
              title: "Signal Logging",
              desc: "Persist execution logs",
              checked: true,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex justify-between items-center border-t border-black/10 pt-3"
            >
              <div>
                <p className="text-sm">{item.title}</p>
                <p className="text-[11px] text-black/50">
                  {item.desc}
                </p>
              </div>

              <Switch
                defaultChecked={item.checked}
                className="data-[state=checked]:bg-black border border-black"
              />
            </div>
          ))}
        </div>

        {/* SAVE */}
        <button className="w-full border-2 border-black py-3 font-mono text-sm bg-black text-white hover:bg-white hover:text-black transition">
          APPLY CONFIGURATION
        </button>

      </div>
    </AppLayout>
  );
};

export default SettingsPage;
