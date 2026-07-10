import { describe, expect, it } from "vitest";
import { slugify } from "./slugify.js";

describe("slugify", () => {
  it("converts text to a URL-safe slug", () => {
    expect(slugify("Attack on Titan")).toBe("attack-on-titan");
  });

  it("trims and collapses separators", () => {
    expect(slugify("  One   Piece!!!  ")).toBe("one-piece");
  });
});
