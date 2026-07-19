import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/telemetry-card";
import { queues } from "@/lib/mock-data";
import { ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/queues")({
  head: () => ({
    meta: [
      { title: "Queue Optimizer · StadiumMind AI" },
      { name: "description", content: "Predicts food, restroom, and merchandise wait times, then suggests faster nearby alternatives." },
    ],
  }),
  component: Queues,
});

function Queues() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <SectionHeader
        eyebrow="Predictive wait times · redirect suggestions"
        title="Queue Optimizer"
      />

      <div className="grid gap-4">
        {queues.map((q) => {
          const tone = q.wait > 15 ? "text-hazard" : q.wait > 8 ? "text-cyber" : "text-neon";
          return (
            <div key={q.name} className="bg-card border border-border rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-4 md:min-w-[280px]">
                <div className={`size-12 rounded-lg bg-secondary/60 grid place-items-center ${tone}`}>
                  <Clock className="size-5" />
                </div>
                <div>
                  <div className="text-sm text-foreground font-medium">{q.name}</div>
                  <div className={`text-2xl font-display font-bold ${tone}`}>{q.wait} min</div>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-3 p-3 bg-secondary/30 rounded-lg border border-border">
                <ArrowRight className="size-4 text-cyber shrink-0" />
                <p className="text-sm text-foreground/90">
                  <span className="text-[10px] font-mono text-cyber uppercase tracking-widest mr-2">
                    AI SUGGEST
                  </span>
                  {q.suggestion}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}