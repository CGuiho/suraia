/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { CenterController };
export type { CenterControllerOptions };

interface CenterControllerOptions {
  inline?: boolean;
}

class CenterController {
  private inline: boolean;

  constructor(options: CenterControllerOptions = {}) {
    this.inline = options.inline ?? false;
  }

  public isInline(): boolean {
    return this.inline;
  }

  public setInline(inline: boolean): void {
    this.inline = inline;
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-inline': this.inline ? 'true' : undefined,
    };
  }
}
