import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader, TelemetryCard } from "@/components/telemetry-card";
import { Accessibility as AccessIcon, ArrowUpDown, Volume2, Route as RouteIcon } from "lucide-react";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility Assistant · StadiumMind AI" },
      { name: "description", content: "Wheelchair-mode navigation, accessible washrooms, elevators, and quieter routes for all fans." },
    ],
  }),
  component: AccessibilityPage,
});

const features = [
  { icon: RouteIcon, title: "Wheelchair Route", detail: "Level 200 · avoids stairs · 3 ramps · 2 elevators" },
  { icon: ArrowUpDown, title: "Elevators", detail: "4 of 5 operational · Elev. 3 maintenance (ETA 22 min)" },
  { icon: AccessIcon, title: "Accessible Restrooms", detail: "12 across the venue · nearest 40m · avg wait 2 min" },
  { icon: Volume2, title: "Sensory-Quiet Route", detail: "Concourse E → Sec 208 · sound < 65 dB · dimmed lighting" },
];

function AccessibilityPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <SectionHeader
        eyebrow="Wheelchair mode · quieter routes · assistance"
        title="Accessibility Assistant"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <TelemetryCard label="Assist Requests" value="14" tone="cyber" hint="Live from concierge" />
        <TelemetryCard label="Elevator Uptime" value="98%" tone="neon" hint="Rolling 60 min" />
        <TelemetryCard label="Wheelchair Loans" value="22 / 40" hint="18 available" />
        <TelemetryCard label="Interpreters" value="6" tone="cyber" hint="ASL + Auslan on call" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {features.map((f) => (
          <div key={f.title} className="p-5 bg-card border border-border rounded-2xl flex gap-4">
            <div className="size-12 rounded-lg bg-cyber/15 text-cyber grid place-items-center shrink-0">
              <f.icon className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}