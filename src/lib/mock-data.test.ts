import { describe, it, expect } from "vitest";
import {
  venue,
  sectors,
  incidents,
  transport,
  queues,
  languages,
  conciergePresets,
  sustainability,
  volunteers,
} from "./mock-data";

describe("mock-data invariants", () => {
  it("venue occupancy is within capacity", () => {
    expect(venue.occupancy).toBeLessThanOrEqual(venue.capacity);
    expect(venue.occupancy).toBeGreaterThan(0);
  });

  it("every sector has a valid occupancy ratio and status", () => {
    const validStatuses = new Set(["nominal", "watch", "critical"]);
    for (const s of sectors) {
      expect(s.occupancy).toBeGreaterThanOrEqual(0);
      expect(s.occupancy).toBeLessThanOrEqual(1);
      expect(s.flow).toBeGreaterThanOrEqual(0);
      expect(validStatuses.has(s.status)).toBe(true);
    }
  });

  it("incidents have unique ids and required fields", () => {
    const ids = incidents.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const i of incidents) {
      expect(i.title.length).toBeGreaterThan(0);
      expect(i.ai.length).toBeGreaterThan(0);
    }
  });

  it("parking availability never exceeds total", () => {
    for (const lot of transport.parking) {
      expect(lot.available).toBeLessThanOrEqual(lot.total);
      expect(lot.available).toBeGreaterThanOrEqual(0);
    }
  });

  it("queue wait times are non-negative", () => {
    for (const q of queues) {
      expect(q.wait).toBeGreaterThanOrEqual(0);
      expect(q.suggestion.length).toBeGreaterThan(0);
    }
  });

  it("supports the FIFA-required language set", () => {
    const codes = languages.map((l) => l.code);
    for (const req of ["en", "es", "fr", "pt", "hi", "ar"]) {
      expect(codes).toContain(req);
    }
  });

  it("concierge presets have both question and answer", () => {
    for (const p of conciergePresets) {
      expect(p.q.length).toBeGreaterThan(0);
      expect(p.a.length).toBeGreaterThan(0);
    }
  });

  it("sustainability metrics are within 0-100 percentages", () => {
    expect(sustainability.energyRenewable).toBeGreaterThanOrEqual(0);
    expect(sustainability.energyRenewable).toBeLessThanOrEqual(100);
    expect(sustainability.wasteDiverted).toBeGreaterThanOrEqual(0);
    expect(sustainability.wasteDiverted).toBeLessThanOrEqual(100);
  });

  it("volunteers have unique ids", () => {
    const ids = volunteers.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});