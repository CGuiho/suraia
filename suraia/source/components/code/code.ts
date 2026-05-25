/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { CodeController };
export type { CodeControllerOptions };

interface CodeControllerOptions {
  block?: boolean;
  color?: string;
}

class CodeController {
  private block: boolean;
  private color: string;

  constructor(options: CodeControllerOptions = {}) {
    this.block = options.block ?? false;
    this.color = options.color ?? "primary";
  }

  public isBlock(): boolean {
    return this.block;
  }

  public setBlock(block: boolean): void {
    this.block = block;
  }

  public getColor(): string {
    return this.color;
  }

  public setColor(color: string): void {
    this.color = color;
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      "data-suraia-component": "Code",
      "data-suraia-block": this.block ? "" : undefined,
    };
  }
}
