import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader, TelemetryCard } from "@/components/telemetry-card";
import { sustainability } from "@/lib/mock-data";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability · StadiumMind AI" },
      { name: "description", content: "Live venue sustainability metrics: energy mix, water saved, waste diverted, and CO₂ offset." },
    ],
  }),
  component: Sustainability,
});

function Sustainability() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <SectionHeader
        eyebrow="Operations telemetry · match-day totals"
        title="Sustainability"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <TelemetryCard label="Water Saved" value={sustainability.waterSaved} tone="cyber" hint="Recycled greywater" />
        <TelemetryCard label="Renewable Energy" value={`${sustainability.energyRenewable}%`} tone="neon" hint="Solar + grid mix" />
        <TelemetryCard label="Waste Diverted" value={`${sustainability.wasteDiverted}%`} tone="neon" hint="Recycled + composted" />
        <TelemetryCard label="CO₂ Offset" value={sustainability.co2Offset} tone="cyber" hint="Certified credits" />
      </div>

      <div className="p-6 bg-card border border-border rounded-2xl">
        <div className="text-[10px] font-mono text-cyber uppercase tracking-widest mb-2">
          AI insight
        </div>
        <p className="text-lg font-display text-foreground leading-snug">
          Concourse B lighting can be dimmed <span className="text-neon">14%</span> during the
          second half without impacting crowd sentiment. Projected savings:{" "}
          <span className="text-neon">62 kWh</span> per match.
        </p>
      </div>
    </div>
  );
}