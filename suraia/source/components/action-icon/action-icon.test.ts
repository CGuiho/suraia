/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { ActionIconController } from "./action-icon";

describe("ActionIconController", () => {
  test("defaults", () => {
    const ctrl = new ActionIconController();
    expect(ctrl.getVariant()).toBe("subtle");
    expect(ctrl.getSize()).toBe("md");
    expect(ctrl.isDisabled()).toBe(false);
    expect(ctrl.isLoading()).toBe(false);
  });

  test("trigger invokes onClick when active", () => {
    const fn = mock(() => {});
    const ctrl = new ActionIconController({ onClick: fn });
    const event = { preventDefault: mock(() => {}), stopPropagation: mock(() => {}) } as unknown as MouseEvent;
    ctrl.trigger(event);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("trigger does not invoke when disabled", () => {
    const fn = mock(() => {});
    const ctrl = new ActionIconController({ disabled: true, onClick: fn });
    const event = { preventDefault: mock(() => {}), stopPropagation: mock(() => {}) } as unknown as MouseEvent;
    ctrl.trigger(event);
    expect(fn).not.toHaveBeenCalled();
  });

  test("getDataAttributes includes state", () => {
    const ctrl = new ActionIconController({ disabled: true, loading: true });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-state"]).toBe("disabled loading");
  });

  test("handleKeyDown triggers on Enter and Space", () => {
    const fn = mock(() => {});
    const ctrl = new ActionIconController({ onClick: fn });
    const enterEvent = { key: "Enter", preventDefault: mock(() => {}), stopPropagation: mock(() => {}) } as unknown as KeyboardEvent;
    ctrl.handleKeyDown(enterEvent);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
