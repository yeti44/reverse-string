import { describe, expect, it } from "vitest";
import { reverseString } from "../src/reverse.js";

describe("reverseString", () => {
  it("reverses a simple ASCII string", () => {
    expect(reverseString("hello")).toBe("olleh");
  });

  it("returns an empty string unchanged", () => {
    expect(reverseString("")).toBe("");
  });

  it("is its own inverse", () => {
    const value = "The quick brown fox";
    expect(reverseString(reverseString(value))).toBe(value);
  });

  it("keeps surrogate-pair emoji intact", () => {
    expect(reverseString("ab😀")).toBe("😀ba");
  });

  it("keeps combined accents attached to their base letter", () => {
    // "é" as e + combining acute accent should stay together, not split.
    const combined = "e\u0301";
    expect(reverseString(`a${combined}`)).toBe(`${combined}a`);
  });
});
