import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn (class merger)", () => {
  it("joins truthy class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  it("merges conflicting tailwind classes (last wins)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("resolves conditional records", () => {
    expect(cn("base", { active: true, hidden: false })).toBe("base active");
  });
});