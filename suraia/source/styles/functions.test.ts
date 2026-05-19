import { expect, test, describe } from "bun:test";
import { alpha, rem, fluid } from "./functions.js";

describe("functions.ts", () => {
  describe("alpha", () => {
    test("sets alpha channel on standard hsl colors", () => {
      expect(alpha("hsl(210, 100%, 50%)", 0.5)).toBe("hsla(210, 100%, 50%, 0.5)");
      expect(alpha("hsl(120, 50%, 30%)", 1)).toBe("hsla(120, 50%, 30%, 1)");
      expect(alpha("hsl(360, 20%, 80%)", 0)).toBe("hsla(360, 20%, 80%, 0)");
    });

    test("sets alpha channel on hsla colors overriding the existing alpha", () => {
      expect(alpha("hsla(210, 100%, 50%, 0.8)", 0.2)).toBe("hsla(210, 100%, 50%, 0.2)");
      expect(alpha("hsla(120, 50%, 30%, 1)", 0.5)).toBe("hsla(120, 50%, 30%, 0.5)");
    });

    test("handles space-separated syntax", () => {
      expect(alpha("hsl(200 100% 50%)", 0.7)).toBe("hsla(200, 100%, 50%, 0.7)");
      expect(alpha("hsla(200 100% 50% / 0.8)", 0.4)).toBe("hsla(200, 100%, 50%, 0.4)");
    });

    test("handles units on hue", () => {
      expect(alpha("hsl(210deg, 100%, 50%)", 0.5)).toBe("hsla(210deg, 100%, 50%, 0.5)");
      expect(alpha("hsl(1.5rad, 100%, 50%)", 0.5)).toBe("hsla(1.5rad, 100%, 50%, 0.5)");
    });

    test("throws errors for invalid input", () => {
      expect(() => alpha("rgb(255, 0, 0)", 0.5)).toThrow();
      expect(() => alpha("hsl(210, 100%)", 0.5)).toThrow();
      expect(() => alpha("hsl(210, 100%, 50%)", 1.5)).toThrow();
      expect(() => alpha("hsl(210, 100%, 50%)", -0.1)).toThrow();
    });
  });

  describe("rem", () => {
    test("converts px to rem", () => {
      expect(rem(16)).toBe("1rem");
      expect(rem(24)).toBe("1.5rem");
      expect(rem(8)).toBe("0.5rem");
    });
  });

  describe("fluid", () => {
    test("calculates fluid clamp expression", () => {
      const result = fluid(16, 24, 320, 1200);
      expect(result).toContain("clamp(");
      expect(result).toContain("16px");
      expect(result).toContain("24px");
    });
  });
});
