import { SidebarTrigger } from "@/components/ui/sidebar";
import { languages, venue } from "@/lib/mock-data";
import { Globe, Radio } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-16 border-b border-border/60 flex items-center justify-between px-4 md:px-6 bg-background/80 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <div className="size-8 bg-cyber rounded-sm grid place-items-center shrink-0">
            <div className="size-4 border-2 border-obsidian rotate-45" />
          </div>
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-display text-lg md:text-xl font-bold tracking-tight text-foreground truncate">
              StadiumMind <span className="text-cyber">AI</span>
            </span>
            <div className="h-4 w-px bg-border hidden md:block" />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold hidden md:inline">
              World Cup 2026 Ops Center
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <div className="hidden md:flex items-center gap-2">
          <Radio className="size-3.5 text-neon animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground">
            System Live · <span className="text-foreground">{venue.name}</span>
          </span>
        </div>
        <div className="h-8 w-px bg-border hidden md:block" />
        <label className="flex items-center gap-2 px-3 py-1.5 bg-secondary/60 hover:bg-secondary border border-border rounded text-xs transition-colors cursor-pointer">
          <Globe className="size-3.5 text-cyber" />
          <span className="text-muted-foreground">Translator:</span>
          <select className="bg-transparent outline-none text-foreground font-medium cursor-pointer">
            {languages.map((l) => (
              <option key={l.code} value={l.code} className="bg-surface">
                {l.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </header>
  );
}