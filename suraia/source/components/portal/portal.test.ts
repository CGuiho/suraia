/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect, mock } from "bun:test";
import { PortalController } from "./portal";

describe("PortalController", () => {
  test("defaults", () => {
    const ctrl = new PortalController();
    expect(ctrl.getTarget()).toBe("body");
  });

  test("mounts to element target", () => {
    const mockChildren: any[] = [];
    const mockTarget = {
      appendChild: mock((child: any) => {
        mockChildren.push(child);
      })
    } as unknown as HTMLElement;

    const ctrl = new PortalController({ target: mockTarget });
    const mockElement = {
      parentNode: null
    } as unknown as HTMLElement;

    const result = ctrl.mount(mockElement);
    expect(result).toBe(mockElement);
    expect(mockTarget.appendChild).toHaveBeenCalledTimes(1);
    expect(mockChildren.includes(mockElement)).toBe(true);
  });

  test("unmount removes child from parentNode", () => {
    const removeChildMock = mock(() => {});
    const parentNodeMock = {
      removeChild: removeChildMock
    };
    const mockElement = {
      parentNode: parentNodeMock
    } as unknown as HTMLElement;

    const mockTarget = {
      appendChild: mock(() => {})
    } as unknown as HTMLElement;

    const ctrl = new PortalController({ target: mockTarget });
    ctrl.mount(mockElement);
    
    ctrl.unmount();
    expect(removeChildMock).toHaveBeenCalledTimes(1);
  });
});
