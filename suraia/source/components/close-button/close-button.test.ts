/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { CloseButtonController } from "./close-button";

describe("CloseButtonController", () => {
  test("defaults", () => {
    const ctrl = new CloseButtonController();
    expect(ctrl.isDisabled()).toBe(false);
  });

  test("trigger fires onClick", () => {
    const fn = mock(() => {});
    const ctrl = new CloseButtonController({ onClick: fn });
    ctrl.trigger();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("trigger does nothing when disabled", () => {
    const fn = mock(() => {});
    const ctrl = new CloseButtonController({ disabled: true, onClick: fn });
    ctrl.trigger();
    expect(fn).not.toHaveBeenCalled();
  });
});
