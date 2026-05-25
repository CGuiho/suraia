/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { CardController } from "./card";

describe("CardController", () => {
  test("defaults", () => {
    const ctrl = new CardController();
    expect(ctrl.getShadow()).toBe("none");
    expect(ctrl.getRadius()).toBe("md");
    expect(ctrl.hasBorder()).toBe(false);
    expect(ctrl.getPadding()).toBe("md");
    
    const attrs = ctrl.getDataAttributes();
    expect(attrs['data-suraia-shadow']).toBeUndefined();
    expect(attrs['data-suraia-radius']).toBe("md");
    expect(attrs['data-suraia-padding']).toBe("md");
    expect(attrs['data-suraia-with-border']).toBeUndefined();
  });

  test("with options", () => {
    const ctrl = new CardController({
      shadow: "sm",
      radius: "lg",
      padding: "xs",
      withBorder: true,
    });
    expect(ctrl.getShadow()).toBe("sm");
    expect(ctrl.getRadius()).toBe("lg");
    expect(ctrl.hasBorder()).toBe(true);
    expect(ctrl.getPadding()).toBe("xs");
    
    const attrs = ctrl.getDataAttributes();
    expect(attrs['data-suraia-shadow']).toBe("sm");
    expect(attrs['data-suraia-radius']).toBe("lg");
    expect(attrs['data-suraia-padding']).toBe("xs");
    expect(attrs['data-suraia-with-border']).toBe("true");
  });
});
