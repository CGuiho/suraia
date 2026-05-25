/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { NumberFormatterController } from "./number-formatter";

describe("NumberFormatterController", () => {
  test("default configuration formatting", () => {
    const ctrl = new NumberFormatterController({ value: 12345.678 });
    expect(ctrl.getFormattedValue()).toBe("12,345.678");
  });

  test("currency type formatting", () => {
    const ctrl = new NumberFormatterController({
      value: 1234.56,
      type: "currency",
      currency: "USD",
      locale: "en-US",
    });
    const res = ctrl.getFormattedValue().replace(/\u00a0/g, " ");
    expect(res).toBe("$1,234.56");
  });

  test("percent type formatting", () => {
    const ctrl = new NumberFormatterController({
      value: 0.125,
      type: "percent",
      locale: "en-US",
    });
    expect(ctrl.getFormattedValue()).toBe("12.5%");
  });

  test("prefixes and suffixes", () => {
    const ctrl = new NumberFormatterController({
      value: 100,
      prefix: "approx. ",
      suffix: " m/s",
    });
    expect(ctrl.getFormattedValue()).toBe("approx. 100 m/s");
  });

  test("setters updates and format options", () => {
    const ctrl = new NumberFormatterController();
    ctrl.setValue(42.1);
    ctrl.setLocale("fr-FR");
    const res = ctrl.getFormattedValue().replace(/\u00a0/g, " ");
    expect(res).toBe("42,1");
  });
});
