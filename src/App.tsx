import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import LiveMonitor from "./pages/LiveMonitor.tsx";
import AuditLogs from "./pages/AuditLogs.tsx";
import Violations from "./pages/Violations.tsx";
import Agents from "./pages/Agents.tsx";
import Policies from "./pages/Policies.tsx";
import SettingsPage from "./pages/Settings.tsx";
import NotFound from "./pages/NotFound.tsx";
import LandingPage from "./pages/LandingPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/monitor" element={<LiveMonitor />} />
          <Route path="/audit" element={<AuditLogs />} />
          <Route path="/violations" element={<Violations />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
