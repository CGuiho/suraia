/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { PillController } from "./pill";

describe("PillController", () => {
  test("initializes correctly", () => {
    const ctrl = new PillController({ label: "React" });
    expect(ctrl.getLabel()).toBe("React");
    expect(ctrl.isDisabled()).toBe(false);
    expect(ctrl.hasRemoveButton()).toBe(false);
  });

  test("triggers onRemove when calling remove()", () => {
    const fn = mock(() => {});
    const ctrl = new PillController({ label: "Vue", withRemoveButton: true, onRemove: fn });
    ctrl.remove();
    expect(fn).toHaveBeenCalled();
  });

  test("does not trigger onRemove when disabled", () => {
    const fn = mock(() => {});
    const ctrl = new PillController({ label: "Vue", disabled: true, withRemoveButton: true, onRemove: fn });
    ctrl.remove();
    expect(fn).not.toHaveBeenCalled();
  });

  test("triggers remove on Backspace/Delete keyboard events", () => {
    const fn = mock(() => {});
    const ctrl = new PillController({ label: "Svelte", withRemoveButton: true, onRemove: fn });
    const event = { key: "Backspace", preventDefault: mock(() => {}) } as unknown as KeyboardEvent;
    ctrl.handleKeyDown(event);
    expect(fn).toHaveBeenCalled();
  });
});
