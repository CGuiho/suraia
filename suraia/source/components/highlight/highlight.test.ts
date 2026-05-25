/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, test, expect } from "bun:test";
import { HighlightController } from "./highlight";

describe("HighlightController", () => {
  test("no queries", () => {
    const ctrl = new HighlightController({ text: "Hello World" });
    const chunks = ctrl.getChunks();
    expect(chunks).toEqual([{ text: "Hello World", highlighted: false }]);
  });

  test("single query highlight", () => {
    const ctrl = new HighlightController({ text: "Hello World", highlight: "world" });
    const chunks = ctrl.getChunks();
    expect(chunks).toEqual([
      { text: "Hello ", highlighted: false },
      { text: "World", highlighted: true },
    ]);
  });

  test("multiple queries highlight", () => {
    const ctrl = new HighlightController({
      text: "Hello World and Universe",
      highlight: ["hello", "universe"],
    });
    const chunks = ctrl.getChunks();
    expect(chunks).toEqual([
      { text: "Hello", highlighted: true },
      { text: " World and ", highlighted: false },
      { text: "Universe", highlighted: true },
    ]);
  });

  test("overlapping queries priority", () => {
    const ctrl = new HighlightController({
      text: "JavaScript",
      highlight: ["Java", "JavaScript"],
    });
    const chunks = ctrl.getChunks();
    expect(chunks).toEqual([
      { text: "JavaScript", highlighted: true },
    ]);
  });
});
