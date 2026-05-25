/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { AvatarController } from "./avatar";

describe("AvatarController", () => {
  test("defaults", () => {
    const ctrl = new AvatarController();
    expect(ctrl.getSrc()).toBeUndefined();
    expect(ctrl.shouldShowImage()).toBe(false);
    expect(ctrl.getInitials()).toBe("");
  });

  test("shouldShowImage with valid src", () => {
    const ctrl = new AvatarController({ src: "avatar.jpg" });
    expect(ctrl.shouldShowImage()).toBe(true);
  });

  test("handleImageError falls back", () => {
    const ctrl = new AvatarController({ src: "broken.jpg" });
    ctrl.handleImageError();
    expect(ctrl.shouldShowImage()).toBe(false);
    expect(ctrl.hasImageError()).toBe(true);
  });

  test("getInitials single name", () => {
    const ctrl = new AvatarController({ name: "Cristóvão" });
    expect(ctrl.getInitials()).toBe("C");
  });

  test("getInitials full name", () => {
    const ctrl = new AvatarController({ name: "John Doe" });
    expect(ctrl.getInitials()).toBe("JD");
  });

  test("getInitials three-part name", () => {
    const ctrl = new AvatarController({ name: "Alice Marie Smith" });
    expect(ctrl.getInitials()).toBe("AS");
  });
});
