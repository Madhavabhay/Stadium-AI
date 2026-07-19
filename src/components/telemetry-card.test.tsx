import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TelemetryCard, SectionHeader } from "./telemetry-card";

describe("TelemetryCard", () => {
  it("renders label, value and hint", () => {
    render(<TelemetryCard label="Occupancy" value="68,402" hint="of 70,240" />);
    expect(screen.getByText("Occupancy")).toBeInTheDocument();
    expect(screen.getByText("68,402")).toBeInTheDocument();
    expect(screen.getByText("of 70,240")).toBeInTheDocument();
  });

  it("applies tone class for cyber", () => {
    render(<TelemetryCard label="Signal" value="Live" tone="cyber" />);
    expect(screen.getByText("Live")).toHaveClass("text-cyber");
  });

  it("applies tone class for hazard", () => {
    render(<TelemetryCard label="Alert" value="3" tone="hazard" />);
    expect(screen.getByText("3")).toHaveClass("text-hazard");
  });

  it("renders children content", () => {
    render(
      <TelemetryCard label="X" value="1">
        <span>extra</span>
      </TelemetryCard>,
    );
    expect(screen.getByText("extra")).toBeInTheDocument();
  });
});

describe("SectionHeader", () => {
  it("renders title as heading level 1", () => {
    render(<SectionHeader title="Crowd Heatmap" />);
    const h = screen.getByRole("heading", { level: 1, name: "Crowd Heatmap" });
    expect(h).toBeInTheDocument();
  });

  it("renders eyebrow when provided", () => {
    render(<SectionHeader eyebrow="LIVE" title="Ops" />);
    expect(screen.getByText("LIVE")).toBeInTheDocument();
  });

  it("renders actions slot", () => {
    render(<SectionHeader title="Ops" actions={<button>Go</button>} />);
    expect(screen.getByRole("button", { name: "Go" })).toBeInTheDocument();
  });
});