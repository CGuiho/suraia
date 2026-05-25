/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { UnstyledButtonController } from "./unstyled-button";

describe("UnstyledButtonController", () => {
  test("defaults", () => {
    const ctrl = new UnstyledButtonController();
    expect(ctrl.isDisabled()).toBe(false);
    expect(ctrl.getDataAttributes()['data-suraia-disabled']).toBeUndefined();
  });

  test("disabled state", () => {
    const ctrl = new UnstyledButtonController({ disabled: true });
    expect(ctrl.isDisabled()).toBe(true);
    expect(ctrl.getDataAttributes()['data-suraia-disabled']).toBe("true");
  });
});
