/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { TabsController } from "./tabs";

describe("TabsController", () => {
  const tabs = ["gallery", "messages", "settings"];

  test("defaults to first tab", () => {
    const ctrl = new TabsController({ tabs });
    expect(ctrl.getActiveTab()).toBe("gallery");
    expect(ctrl.isActive("gallery")).toBe(true);
    expect(ctrl.isActive("messages")).toBe(false);
  });

  test("setActiveTab changes tab and calls onChange", () => {
    const fn = mock((_v: string) => {});
    const ctrl = new TabsController({ tabs, onChange: fn });
    ctrl.setActiveTab("messages");
    expect(ctrl.getActiveTab()).toBe("messages");
    expect(fn).toHaveBeenCalledWith("messages");
  });

  test("setActiveTab ignores invalid tab", () => {
    const ctrl = new TabsController({ tabs });
    ctrl.setActiveTab("nonexistent");
    expect(ctrl.getActiveTab()).toBe("gallery");
  });

  test("getNextTab wraps around", () => {
    const ctrl = new TabsController({ tabs, defaultValue: "settings" });
    expect(ctrl.getNextTab()).toBe("gallery");
  });

  test("getPrevTab wraps around", () => {
    const ctrl = new TabsController({ tabs, defaultValue: "gallery" });
    expect(ctrl.getPrevTab()).toBe("settings");
  });

  test("handleKeyDown ArrowRight moves to next", () => {
    const fn = mock((_v: string) => {});
    const ctrl = new TabsController({ tabs, onChange: fn });
    const event = { key: "ArrowRight", preventDefault: mock(() => {}) } as unknown as KeyboardEvent;
    ctrl.handleKeyDown(event);
    expect(ctrl.getActiveTab()).toBe("messages");
  });

  test("handleKeyDown Home moves to first", () => {
    const fn = mock((_v: string) => {});
    const ctrl = new TabsController({ tabs, defaultValue: "settings", onChange: fn });
    const event = { key: "Home", preventDefault: mock(() => {}) } as unknown as KeyboardEvent;
    ctrl.handleKeyDown(event);
    expect(ctrl.getActiveTab()).toBe("gallery");
  });

  test("handleKeyDown End moves to last", () => {
    const fn = mock((_v: string) => {});
    const ctrl = new TabsController({ tabs, onChange: fn });
    const event = { key: "End", preventDefault: mock(() => {}) } as unknown as KeyboardEvent;
    ctrl.handleKeyDown(event);
    expect(ctrl.getActiveTab()).toBe("settings");
  });
});
