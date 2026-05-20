import { expect, test, describe } from "bun:test";
import { alpha, rem, fluid } from "./functions";

describe("functions.ts", () => {
  describe("alpha", () => {
    test("sets alpha channel on HEX colors", () => {
      // #rgb -> #rrggbbaa
      expect(alpha("#fff", 0.5)).toBe("#ffffff80");
      expect(alpha("#000", 0)).toBe("#00000000");
      expect(alpha("#123", 1)).toBe("#112233ff");

      // #rgba -> #rrggbbaa (overrides existing)
      expect(alpha("#fff8", 0.2)).toBe("#ffffff33");

      // #rrggbb -> #rrggbbaa
      expect(alpha("#ffffff", 0.5)).toBe("#ffffff80");
      expect(alpha("#000000", 1)).toBe("#000000ff");

      // #rrggbbaa -> #rrggbbaa (overrides existing)
      expect(alpha("#ffffff80", 0.2)).toBe("#ffffff33");
    });

    test("sets alpha channel on RGB/RGBA colors", () => {
      expect(alpha("rgb(255, 255, 255)", 0.5)).toBe("rgba(255, 255, 255, 0.5)");
      expect(alpha("rgba(0, 128, 255, 0.8)", 0.2)).toBe("rgba(0, 128, 255, 0.2)");
      expect(alpha("rgb(0 0 0)", 1)).toBe("rgba(0, 0, 0, 1)");
      expect(alpha("rgba(0 0 0 / 0.5)", 0.3)).toBe("rgba(0, 0, 0, 0.3)");
    });

    test("sets alpha channel on HSL/HSLA colors", () => {
      expect(alpha("hsl(210, 100%, 50%)", 0.5)).toBe("hsla(210, 100%, 50%, 0.5)");
      expect(alpha("hsla(120, 50%, 30%, 0.8)", 0.2)).toBe("hsla(120, 50%, 30%, 0.2)");
      expect(alpha("hsl(200 100% 50%)", 0.7)).toBe("hsla(200, 100%, 50%, 0.7)");
      expect(alpha("hsla(200 100% 50% / 0.8)", 0.4)).toBe("hsla(200, 100%, 50%, 0.4)");
    });

    test("handles units on hue in HSL", () => {
      expect(alpha("hsl(210deg, 100%, 50%)", 0.5)).toBe("hsla(210deg, 100%, 50%, 0.5)");
      expect(alpha("hsl(1.5rad, 100%, 50%)", 0.5)).toBe("hsla(1.5rad, 100%, 50%, 0.5)");
    });

    test("throws errors for invalid input", () => {
      expect(() => alpha("notacolor", 0.5)).toThrow();
      expect(() => alpha("#ff", 0.5)).toThrow(); // Invalid hex length
      expect(() => alpha("rgb(255, 100)", 0.5)).toThrow(); // Invalid components
      expect(() => alpha("hsl(210, 100%)", 0.5)).toThrow(); // Invalid components
      expect(() => alpha("#ffffff", 1.5)).toThrow(); // Invalid alpha
      expect(() => alpha("#ffffff", -0.1)).toThrow(); // Invalid alpha
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
