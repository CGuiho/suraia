/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { MarkController };
export type { MarkControllerOptions };

interface MarkControllerOptions {
  color?: string;
}

class MarkController {
  private color?: string;

  constructor(options: MarkControllerOptions = {}) {
    this.color = options.color;
  }

  public getColor(): string | undefined {
    return this.color;
  }

  public setColor(color: string | undefined): void {
    this.color = color;
  }

  public getStyle(): Record<string, string | undefined> {
    return {
      'background-color': this.color,
    };
  }
}
