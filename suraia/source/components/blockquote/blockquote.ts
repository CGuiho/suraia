/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { BlockquoteController };
export type { BlockquoteControllerOptions };

interface BlockquoteControllerOptions {
  color?: string;
}

class BlockquoteController {
  private color: string;

  constructor(options: BlockquoteControllerOptions = {}) {
    this.color = options.color ?? "primary";
  }

  public getColor(): string {
    return this.color;
  }

  public setColor(color: string): void {
    this.color = color;
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      "data-suraia-component": "Blockquote",
    };
  }
}
