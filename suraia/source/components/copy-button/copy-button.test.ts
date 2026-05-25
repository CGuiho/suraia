/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { CopyButtonController } from "./copy-button";

describe("CopyButtonController", () => {
  test("defaults", () => {
    const ctrl = new CopyButtonController({ value: "Hello" });
    expect(ctrl.getValue()).toBe("Hello");
    expect(ctrl.isCopied()).toBe(false);
    expect(ctrl.getDataAttributes()['data-suraia-copied']).toBeUndefined();
  });

  test("triggers copy status", async () => {
    const onCopy = mock(() => {});
    const ctrl = new CopyButtonController({ value: "Hello", timeout: 50, onCopy });
    
    ctrl.copy();
    expect(ctrl.isCopied()).toBe(true);
    expect(ctrl.getDataAttributes()['data-suraia-copied']).toBe("true");
    expect(onCopy).toHaveBeenCalled();

    // Wait for timeout to expire
    await new Promise(resolve => setTimeout(resolve, 60));
    expect(ctrl.isCopied()).toBe(false);
    expect(ctrl.getDataAttributes()['data-suraia-copied']).toBeUndefined();

    ctrl.destroy();
  });
});
