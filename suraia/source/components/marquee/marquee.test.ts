/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { MarqueeController } from "./marquee";

describe("MarqueeController", () => {
  test("initial states", () => {
    const ctrl = new MarqueeController({ speed: 40 });
    expect(ctrl.getDirection()).toBe("left");
    expect(ctrl.getSpeed()).toBe(40);
    expect(ctrl.isPauseOnHover()).toBe(false);
  });

  test("setters update attributes", () => {
    const ctrl = new MarqueeController();
    ctrl.setDirection("up");
    ctrl.setSpeed(100);
    ctrl.setPauseOnHover(true);
    expect(ctrl.getDirection()).toBe("up");
    expect(ctrl.getSpeed()).toBe(100);
    expect(ctrl.isPauseOnHover()).toBe(true);
  });

  test("mapping speed to style", () => {
    const ctrl = new MarqueeController({ speed: 10 });
    const styles = ctrl.getStyle();
    expect(styles["--suraia-marquee-speed"]).toBe("100s");
  });

  test("generates expected data-attributes", () => {
    const ctrl = new MarqueeController({ direction: "right", pauseOnHover: true });
    const attrs = ctrl.getDataAttributes();
    expect(attrs["data-suraia-direction"]).toBe("right");
    expect(attrs["data-suraia-pause-on-hover"]).toBe("true");
  });
});
