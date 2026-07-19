import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader, TelemetryCard } from "@/components/telemetry-card";
import { transport } from "@/lib/mock-data";
import { Bus, ParkingSquare, Train } from "lucide-react";

export const Route = createFileRoute("/transport")({
  head: () => ({
    meta: [
      { title: "Smart Transport · StadiumMind AI" },
      { name: "description", content: "Live metro, parking, and shuttle intelligence with AI-optimized departure recommendations." },
    ],
  }),
  component: Transport,
});

function CrowdingBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color = pct > 75 ? "bg-hazard" : pct > 55 ? "bg-cyber" : "bg-neon";
  return (
    <div className="h-1.5 bg-secondary/60 rounded-full overflow-hidden w-32">
      <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function Transport() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <SectionHeader
        eyebrow="Metro · parking · shuttles"
        title="Smart Transport"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <TelemetryCard label="Best Depart" value="22:48" tone="cyber" hint="8 min after final whistle" />
        <TelemetryCard label="Metro Load" value="62%" hint="Post-match projection" />
        <TelemetryCard label="Parking Free" value="1,704" tone="neon" hint="Across 3 lots" />
        <TelemetryCard label="Shuttle Delay" value="0" tone="neon" hint="All routes on-time" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <Train className="size-4 text-cyber" />
            <h2 className="font-display font-bold uppercase text-sm">Metro</h2>
          </div>
          <div className="divide-y divide-border">
            {transport.metro.map((m) => (
              <div key={m.line} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{m.line}</span>
                  <span
                    className={
                      "text-[10px] uppercase font-semibold px-2 py-0.5 rounded " +
                      (m.status === "delayed"
                        ? "bg-hazard/15 text-hazard"
                        : "bg-neon/15 text-neon")
                    }
                  >
                    {m.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span>Next: {m.eta}</span>
                  <CrowdingBar value={m.crowding} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <ParkingSquare className="size-4 text-cyber" />
            <h2 className="font-display font-bold uppercase text-sm">Parking</h2>
          </div>
          <div className="divide-y divide-border">
            {transport.parking.map((p) => {
              const pct = Math.round((p.available / p.total) * 100);
              return (
                <div key={p.lot} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{p.lot}</span>
                    <span className="text-xs font-mono text-cyber">
                      {p.available.toLocaleString()} free
                    </span>
                  </div>
                  <div className="h-1.5 bg-secondary/60 rounded-full overflow-hidden">
                    <div
                      className={pct < 20 ? "h-full bg-hazard" : "h-full bg-neon"}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <Bus className="size-4 text-cyber" />
            <h2 className="font-display font-bold uppercase text-sm">Shuttles</h2>
          </div>
          <div className="divide-y divide-border">
            {transport.buses.map((b) => (
              <div key={b.route} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{b.route}</span>
                  <span className="text-xs font-mono text-muted-foreground">Next: {b.eta}</span>
                </div>
                <CrowdingBar value={b.crowding} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 bg-card border border-border rounded-2xl">
        <div className="text-[10px] font-mono text-cyber uppercase tracking-widest mb-2">
          AI Recommendation
        </div>
        <p className="text-lg font-display text-foreground leading-snug">
          "Leave <span className="text-cyber">8 minutes after the final whistle</span> and take{" "}
          <span className="text-cyber">Metro Line A from Stadium South</span> — you'll reach Union
          Station by <span className="text-cyber">23:31</span> with 62% carriage load."
        </p>
      </div>
    </div>
  );
}