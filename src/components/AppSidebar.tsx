import {
  LayoutDashboard,
  Monitor,
  FileText,
  AlertTriangle,
  Bot,
  Shield,
  Settings,
  Activity,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Live Monitor", url: "/monitor", icon: Monitor },
  { title: "Violations", url: "/violations", icon: AlertTriangle },
  { title: "Audit Logs", url: "/audit", icon: FileText },
];

const systemNav = [
  { title: "Agents", url: "/agents", icon: Bot },
  { title: "Policies", url: "/policies", icon: Shield },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (url: string) => location.pathname === url;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex flex-col h-full">
        {/* Brand */}
        <div className={`px-4 py-5 ${collapsed ? "px-2" : ""}`}>
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sidebar-primary to-rose-400 flex items-center justify-center shadow-lg shadow-rose-500/20">
                <Shield className="h-4.5 w-4.5 text-sidebar-primary-foreground" />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-sidebar-primary-foreground">SafeCom</h1>
                <p className="text-[10px] text-sidebar-foreground/50 tracking-wide uppercase">Safety Layer</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sidebar-primary to-rose-400 flex items-center justify-center shadow-lg shadow-rose-500/20">
                <Shield className="h-4.5 w-4.5 text-sidebar-primary-foreground" />
              </div>
            </div>
          )}
        </div>

        {/* Status indicator */}
        {!collapsed && (
          <div className="mx-3 mb-3 px-3 py-2.5 rounded-lg bg-sidebar-accent/60 border border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="text-[11px] font-medium text-sidebar-accent-foreground">System Online</span>
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[10px] text-sidebar-foreground/50">Threat Level</span>
              <span className="text-[10px] font-semibold text-emerald-400">SECURE</span>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40 px-3 mb-1">Monitor</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      end
                      className="text-sidebar-foreground/70 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-all duration-150"
                      activeClassName="bg-sidebar-primary/15 text-sidebar-primary font-medium border-l-2 border-sidebar-primary"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="text-[13px]">{item.title}</span>}
                      {!collapsed && isActive(item.url) && <ChevronRight className="h-3 w-3 ml-auto opacity-50" />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Navigation */}
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40 px-3 mb-1">System</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      end
                      className="text-sidebar-foreground/70 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-all duration-150"
                      activeClassName="bg-sidebar-primary/15 text-sidebar-primary font-medium border-l-2 border-sidebar-primary"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="text-[13px]">{item.title}</span>}
                      {!collapsed && isActive(item.url) && <ChevronRight className="h-3 w-3 ml-auto opacity-50" />}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom section */}
        <div className="mt-auto">
          {!collapsed && (
            <div className="mx-3 mb-4 px-3 py-3 rounded-lg bg-gradient-to-br from-sidebar-primary/10 to-sidebar-accent/40 border border-sidebar-border">
              <div className="flex items-center gap-2 mb-1.5">
                <Activity className="h-3.5 w-3.5 text-sidebar-primary" />
                <span className="text-[11px] font-semibold text-sidebar-accent-foreground">Detection Active</span>
              </div>
              <p className="text-[10px] text-sidebar-foreground/50 leading-relaxed">
                Monitoring 4 channels with 4 active agents
              </p>
            </div>
          )}
          {!collapsed && (
            <div className="px-4 pb-4 text-[9px] text-sidebar-foreground/30">
              SafeCom v1.0 · Prototype
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
