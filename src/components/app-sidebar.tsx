import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Accessibility,
  Bot,
  Languages,
  LayoutDashboard,
  Leaf,
  Siren,
  Train,
  UtensilsCrossed,
} from "lucide-react";

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

const modules = [
  { title: "Crowd Heatmap", url: "/", icon: LayoutDashboard, badge: null },
  { title: "Emergency Copilot", url: "/emergency", icon: Siren, badge: "2" },
  { title: "Transport", url: "/transport", icon: Train, badge: null },
  { title: "Queue Optimizer", url: "/queues", icon: UtensilsCrossed, badge: null },
  { title: "Accessibility", url: "/accessibility", icon: Accessibility, badge: null },
  { title: "AI Concierge", url: "/concierge", icon: Bot, badge: null },
  { title: "Translator", url: "/translator", icon: Languages, badge: null },
  { title: "Sustainability", url: "/sustainability", icon: Leaf, badge: null },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon" className="border-r border-border/60">
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Intelligence Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                      <Link
                        to={item.url}
                        className={
                          active
                            ? "flex items-center gap-3 text-cyber bg-cyber/10 border border-cyber/25 rounded-md"
                            : "flex items-center gap-3 text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-md"
                        }
                      >
                        <item.icon className="size-4 shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="text-sm font-medium">{item.title}</span>
                            {item.badge && (
                              <span className="ml-auto bg-hazard/20 text-hazard text-[10px] px-1.5 py-0.5 rounded font-semibold">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto p-4">
            <div className="p-4 bg-secondary/40 rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="size-3.5 text-cyber" />
                <p className="text-xs text-muted-foreground">Predictive Signal</p>
              </div>
              <p className="text-[11px] text-muted-foreground/90 leading-relaxed mb-3">
                14% surge in Gate 4 arrivals expected at 18:45. Recommend opening overflow Lane 8.
              </p>
              <button className="w-full py-2 bg-cyber text-cyber-foreground text-xs font-bold rounded hover:brightness-110 transition-all font-display tracking-wide">
                GENERATE BRIEF
              </button>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}