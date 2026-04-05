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
          <h1 className="text-xl font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground">System configuration and thresholds</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">API Connections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">Model Endpoint</Label>
              <Input value="https://api.groq.com/v1/chat/completions" readOnly className="font-mono text-xs" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">API Key</Label>
              <Input type="password" value="gsk_••••••••••••••••" readOnly className="font-mono text-xs" />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs">Webhook Notifications</Label>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Threshold Tuning</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <Label>Escalation Threshold</Label>
                <span className="font-mono font-semibold">{escalationThreshold[0]}%</span>
              </div>
              <Slider value={escalationThreshold} onValueChange={setEscalationThreshold} max={100} step={1} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <Label>Flag Threshold</Label>
                <span className="font-mono font-semibold">{flagThreshold[0]}%</span>
              </div>
              <Slider value={flagThreshold} onValueChange={setFlagThreshold} max={100} step={1} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <Label>Warn Threshold</Label>
                <span className="font-mono font-semibold">{warnThreshold[0]}%</span>
              </div>
              <Slider value={warnThreshold} onValueChange={setWarnThreshold} max={100} step={1} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">System Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Real-time Processing</p>
                <p className="text-xs text-muted-foreground">Process messages as they arrive</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Auto-Escalation</p>
                <p className="text-xs text-muted-foreground">Automatically escalate DANGEROUS verdicts</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Signal Logging</p>
                <p className="text-xs text-muted-foreground">Log all safety signals to audit trail</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Button className="w-full">Save Changes</Button>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
