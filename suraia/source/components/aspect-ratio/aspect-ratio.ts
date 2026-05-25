/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { AspectRatioController };
export type { AspectRatioControllerOptions };

interface AspectRatioControllerOptions {
  ratio?: number;
}

class AspectRatioController {
  private ratio: number;

  constructor(options: AspectRatioControllerOptions = {}) {
    this.ratio = options.ratio ?? 1;
  }

  public getRatio(): number {
    return this.ratio;
  }

  public setRatio(ratio: number): void {
    this.ratio = ratio;
  }

  public getStyle(): Record<string, string | undefined> {
    return {
      '--suraia-ratio': String(this.ratio),
    };
  }
}
