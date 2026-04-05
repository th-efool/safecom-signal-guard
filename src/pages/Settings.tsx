import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SettingsPage = () => {
  const [escalationThreshold, setEscalationThreshold] = useState([85]);
  const [flagThreshold, setFlagThreshold] = useState([60]);
  const [warnThreshold, setWarnThreshold] = useState([40]);

  return (
    <AppLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">System configuration and thresholds</p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold tracking-tight">API Connections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-[11px] text-muted-foreground uppercase tracking-wide">Model Endpoint</Label>
              <Input value="https://api.groq.com/v1/chat/completions" readOnly className="font-mono text-xs h-9 bg-secondary/50" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-muted-foreground uppercase tracking-wide">API Key</Label>
              <Input type="password" value="gsk_••••••••••••••••" readOnly className="font-mono text-xs h-9 bg-secondary/50" />
            </div>
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-sm font-medium">Webhook Notifications</p>
                <p className="text-[11px] text-muted-foreground">Send alerts to external systems</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold tracking-tight">Threshold Tuning</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <Label className="text-[11px] text-muted-foreground uppercase tracking-wide">Escalation Threshold</Label>
                <span className="font-mono font-semibold text-sm">{escalationThreshold[0]}%</span>
              </div>
              <Slider value={escalationThreshold} onValueChange={setEscalationThreshold} max={100} step={1} />
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <Label className="text-[11px] text-muted-foreground uppercase tracking-wide">Flag Threshold</Label>
                <span className="font-mono font-semibold text-sm">{flagThreshold[0]}%</span>
              </div>
              <Slider value={flagThreshold} onValueChange={setFlagThreshold} max={100} step={1} />
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <Label className="text-[11px] text-muted-foreground uppercase tracking-wide">Warn Threshold</Label>
                <span className="font-mono font-semibold text-sm">{warnThreshold[0]}%</span>
              </div>
              <Slider value={warnThreshold} onValueChange={setWarnThreshold} max={100} step={1} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold tracking-tight">System Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Real-time Processing", desc: "Process messages as they arrive", checked: true },
              { title: "Auto-Escalation", desc: "Automatically escalate DANGEROUS verdicts", checked: true },
              { title: "Signal Logging", desc: "Log all safety signals to audit trail", checked: true },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked={item.checked} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Button className="w-full h-10">Save Changes</Button>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
