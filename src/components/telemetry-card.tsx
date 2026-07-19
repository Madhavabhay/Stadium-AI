import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TelemetryCard({
  label,
  value,
  hint,
  tone = "default",
  className,
  children,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: "default" | "cyber" | "hazard" | "neon";
  className?: string;
  children?: ReactNode;
}) {
  const toneClass =
    tone === "cyber"
      ? "text-cyber"
      : tone === "hazard"
        ? "text-hazard"
        : tone === "neon"
          ? "text-neon"
          : "text-foreground";
  return (
    <div
      className={cn(
        "p-4 bg-card border border-border rounded-xl relative overflow-hidden",
        className,
      )}
    >
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-1">
        {label}
      </div>
      <div className={cn("text-2xl font-display font-bold", toneClass)}>{value}</div>
      {hint && <div className="text-[11px] text-muted-foreground mt-1.5">{hint}</div>}
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  actions,
}: {
  eyebrow?: string;
  title: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        {eyebrow && (
          <div className="text-[10px] font-mono text-cyber uppercase tracking-widest mb-1">
            {eyebrow}
          </div>
        )}
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
          {title}
        </h1>
      </div>
      {actions}
    </div>
  );
}