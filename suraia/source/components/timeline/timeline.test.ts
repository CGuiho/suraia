/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { TimelineController } from "./timeline";

describe("TimelineController", () => {
  test("defaults", () => {
    const ctrl = new TimelineController();
    expect(ctrl.getActive()).toBe(-1);
    expect(ctrl.isReverseActive()).toBe(false);
    expect(ctrl.getBulletSize()).toBe(20);
    expect(ctrl.getAlign()).toBe("left");

    const styles = ctrl.getStyle();
    expect(styles['--suraia-timeline-bullet-size']).toBe("20px");

    const attrs = ctrl.getDataAttributes();
    expect(attrs['data-suraia-align']).toBe("left");
  });

  test("active status indices check", () => {
    const ctrl = new TimelineController({
      active: 2,
    });
    const total = 5;

    expect(ctrl.isItemActive(0, total)).toBe(true);
    expect(ctrl.isItemActive(2, total)).toBe(true);
    expect(ctrl.isItemActive(3, total)).toBe(false);

    expect(ctrl.isItemLineActive(0, total)).toBe(true);
    expect(ctrl.isItemLineActive(1, total)).toBe(true);
    expect(ctrl.isItemLineActive(2, total)).toBe(false);
  });

  test("reverse active status", () => {
    const ctrl = new TimelineController({
      active: 1,
      reverseActive: true,
    });
    const total = 4;

    expect(ctrl.isItemActive(3, total)).toBe(true);
    expect(ctrl.isItemActive(2, total)).toBe(true);
    expect(ctrl.isItemActive(1, total)).toBe(false);

    expect(ctrl.isItemLineActive(3, total)).toBe(true);
    expect(ctrl.isItemLineActive(2, total)).toBe(false);
  });
});
