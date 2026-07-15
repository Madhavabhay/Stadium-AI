import { useState } from "react";
import { incidents } from "@/lib/mock-data";
import { Loader2, Send } from "lucide-react";

const priorityDot = {
  critical: "bg-hazard ring-hazard/20",
  high: "bg-cyber ring-cyber/20",
  info: "bg-muted-foreground/60 ring-muted-foreground/10",
} as const;

export function IncidentRail() {
  const [q, setQ] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <div className="bg-card border border-border rounded-2xl flex flex-col overflow-hidden h-full min-h-[520px]">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-foreground uppercase text-sm tracking-wide">
            Incident Copilot
          </h2>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Emergency triage · AI action plans
          </p>
        </div>
        <span className="text-[10px] text-neon bg-neon/10 border border-neon/20 px-2 py-0.5 rounded font-mono">
          ● active
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {incidents.map((inc) => (
          <div key={inc.id} className="relative pl-6 border-l border-border">
            <div
              className={`absolute -left-[5px] top-1 size-2.5 rounded-full ring-4 ${priorityDot[inc.priority]}`}
            />
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-1 font-mono">
              <span>{inc.time}</span>
              <span>·</span>
              <span className="uppercase tracking-wider">{inc.kind}</span>
              <span className="ml-auto text-muted-foreground/60">{inc.id}</span>
            </div>
            <p className="text-xs text-foreground font-medium leading-snug">{inc.title}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{inc.detail}</p>
            <div className="mt-2 p-3 bg-secondary/40 border border-border rounded-lg text-[11px] leading-relaxed text-foreground/90">
              <span className="text-cyber font-mono text-[10px] uppercase tracking-wider">
                AI plan ·{" "}
              </span>
              {inc.ai}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-background/40 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!q.trim()) return;
            setPending(true);
            setTimeout(() => {
              setPending(false);
              setQ("");
            }, 900);
          }}
          className="relative"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Query AI · e.g. Predict congestion at final whistle"
            className="w-full bg-secondary/40 border border-border rounded-lg py-2.5 pl-4 pr-10 text-xs focus:outline-none focus:border-cyber transition-all text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="absolute right-2 top-1.5 p-1.5 text-cyber hover:bg-cyber/10 rounded"
          >
            {pending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}