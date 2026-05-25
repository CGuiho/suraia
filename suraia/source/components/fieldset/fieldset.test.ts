/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { FieldsetController } from "./fieldset";

describe("FieldsetController", () => {
  test("defaults", () => {
    const ctrl = new FieldsetController();
    expect(ctrl.getLegend()).toBeUndefined();
    expect(ctrl.isDisabled()).toBe(false);

    const attrs = ctrl.getDataAttributes();
    expect(attrs['data-suraia-disabled']).toBeUndefined();
  });

  test("custom options", () => {
    const ctrl = new FieldsetController({
      legend: "Address Details",
      disabled: true,
    });
    expect(ctrl.getLegend()).toBe("Address Details");
    expect(ctrl.isDisabled()).toBe(true);

    const attrs = ctrl.getDataAttributes();
    expect(attrs['data-suraia-disabled']).toBe("true");
  });
});
