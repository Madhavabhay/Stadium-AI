import { createFileRoute } from "@tanstack/react-router";
import stadiumHeatmap from "@/assets/stadium-heatmap.jpg";
import { IncidentRail } from "@/components/incident-rail";
import { SectionHeader, TelemetryCard } from "@/components/telemetry-card";
import { sectors, venue } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const occupancyPct = Math.round((venue.occupancy / venue.capacity) * 100);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <SectionHeader
        eyebrow={`${venue.match} · Kickoff ${venue.kickoff}`}
        title="Crowd Intelligence"
        actions={
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>{venue.weather}</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-neon">● Telemetry live</span>
          </div>
        }
      />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-8 space-y-6">
          {/* Hero heatmap */}
          <div className="relative bg-card border border-border rounded-2xl overflow-hidden aspect-video scanline">
            <img
              src={stadiumHeatmap}
              alt="Real-time stadium crowd heatmap showing gate flow and sector occupancy"
              className="w-full h-full object-cover opacity-90"
              width={1600}
              height={900}
            />
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

            <div className="absolute top-4 left-4 bg-background/85 backdrop-blur-md p-3 border border-border rounded-lg">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Current Occupancy
              </div>
              <div className="text-2xl font-display font-bold text-foreground">
                {venue.occupancy.toLocaleString()}{" "}
                <span className="text-xs text-neon font-normal">
                  / {venue.capacity.toLocaleString()} · {occupancyPct}%
                </span>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 flex flex-wrap gap-2 justify-end">
              {sectors.slice(0, 4).map((s) => {
                const tone =
                  s.status === "critical"
                    ? "text-hazard border-hazard/30"
                    : s.status === "watch"
                      ? "text-cyber border-cyber/30"
                      : "text-foreground border-border";
                return (
                  <div
                    key={s.id}
                    className={`px-3 py-1.5 bg-background/85 backdrop-blur-md border rounded text-[10px] font-mono ${tone}`}
                  >
                    {s.name}: {Math.round(s.occupancy * 100)}%
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sector table */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display font-bold text-sm uppercase tracking-wide">
                Sector Flow
              </h2>
              <span className="text-[10px] font-mono text-muted-foreground">
                Updated 4s ago
              </span>
            </div>
            <div className="divide-y divide-border">
              {sectors.map((s) => (
                <div key={s.id} className="p-4 flex items-center gap-4">
                  <div className="w-12 text-xs font-mono text-cyber">{s.id}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground font-medium">{s.name}</div>
                    <div className="mt-1.5 h-1.5 bg-secondary/60 rounded-full overflow-hidden">
                      <div
                        className={
                          s.status === "critical"
                            ? "h-full bg-hazard"
                            : s.status === "watch"
                              ? "h-full bg-cyber"
                              : "h-full bg-neon"
                        }
                        style={{ width: `${Math.round(s.occupancy * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right text-xs font-mono text-muted-foreground">
                    {s.flow}/min
                  </div>
                  <div className="w-16 text-right">
                    <span
                      className={
                        "text-[10px] uppercase font-semibold px-2 py-0.5 rounded " +
                        (s.status === "critical"
                          ? "bg-hazard/15 text-hazard"
                          : s.status === "watch"
                            ? "bg-cyber/15 text-cyber"
                            : "bg-neon/15 text-neon")
                      }
                    >
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TelemetryCard
              label="Avg. Food Queue"
              value="4.2 min"
              tone="neon"
              hint="↓ 38% vs baseline"
            />
            <TelemetryCard
              label="Metro Delay"
              value="+12 min"
              tone="hazard"
              hint="Line C · airport branch"
            />
            <TelemetryCard
              label="Volunteers"
              value="142 / 160"
              hint="18 on active tasks"
            />
            <TelemetryCard
              label="Predicted Peak"
              value="18:45"
              tone="cyber"
              hint="+14% arrivals at Gate 4"
            />
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4">
          <IncidentRail />
        </div>
      </div>
    </div>
  );
}
