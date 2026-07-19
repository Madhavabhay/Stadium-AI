import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-cyber focus:text-cyber-foreground focus:font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <main
            id="main-content"
            tabIndex={-1}
            aria-label="StadiumMind AI dashboard"
            className="flex-1 min-w-0 focus:outline-none"
          >
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export { SidebarTrigger };