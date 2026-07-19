import { createFileRoute } from "@tanstack/react-router";
import { IncidentRail } from "@/components/incident-rail";
import { SectionHeader, TelemetryCard } from "@/components/telemetry-card";
import { volunteers } from "@/lib/mock-data";
import { AlertOctagon, HeartPulse, Shield, Baby, Flame } from "lucide-react";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency Copilot · StadiumMind AI" },
      { name: "description", content: "AI-prioritized triage for medical, security, missing children, and fire incidents at FIFA World Cup 2026 venues." },
    ],
  }),
  component: Emergency,
});

const categories = [
  { icon: HeartPulse, label: "Medical", open: 1, tone: "text-hazard" },
  { icon: Shield, label: "Security", open: 0, tone: "text-cyber" },
  { icon: Baby, label: "Missing", open: 1, tone: "text-cyber" },
  { icon: Flame, label: "Fire / Hazmat", open: 0, tone: "text-neon" },
];

function Emergency() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <SectionHeader
        eyebrow="Priority triage · 4 open incidents"
        title="Emergency Copilot"
        actions={
          <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-hazard text-hazard-foreground font-display font-bold text-xs tracking-wide rounded hover:brightness-110">
            <AlertOctagon className="size-4" /> DECLARE INCIDENT
          </button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((c) => (
          <div key={c.label} className="p-4 bg-card border border-border rounded-xl flex items-center gap-3">
            <div className={`size-10 rounded-lg bg-secondary/60 grid place-items-center ${c.tone}`}>
              <c.icon className="size-5" />
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
                {c.label}
              </div>
              <div className="text-lg font-display font-bold text-foreground">
                {c.open} open
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-7">
          <IncidentRail />
        </div>
        <div className="col-span-12 xl:col-span-5 space-y-6">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-display font-bold uppercase text-sm tracking-wide">
                Volunteer & Response Teams
              </h2>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Location · role · availability
              </p>
            </div>
            <div className="divide-y divide-border">
              {volunteers.map((v) => (
                <div key={v.id} className="p-4 flex items-center gap-4">
                  <div className="size-9 rounded-full bg-cyber/15 text-cyber grid place-items-center text-[11px] font-mono font-bold">
                    {v.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground font-medium">{v.name}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {v.role} · {v.location}
                    </div>
                  </div>
                  <span
                    className={
                      "text-[10px] uppercase font-semibold px-2 py-0.5 rounded " +
                      (v.status === "available"
                        ? "bg-neon/15 text-neon"
                        : "bg-hazard/15 text-hazard")
                    }
                  >
                    {v.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TelemetryCard label="Avg. Response" value="82s" tone="cyber" hint="Medical dispatch" />
            <TelemetryCard label="False alarms" value="3.1%" tone="neon" hint="AI pre-filter" />
          </div>
        </div>
      </div>
    </div>
  );
}