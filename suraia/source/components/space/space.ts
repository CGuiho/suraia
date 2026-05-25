/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { SpaceController };
export type { SpaceControllerOptions };

interface SpaceControllerOptions {
  h?: string;
  w?: string;
}

class SpaceController {
  private h?: string;
  private w?: string;

  constructor(options: SpaceControllerOptions = {}) {
    this.h = options.h;
    this.w = options.w;
  }

  public getHeight(): string | undefined { return this.h; }
  public setHeight(h: string | undefined): void { this.h = h; }
  public getWidth(): string | undefined { return this.w; }
  public setWidth(w: string | undefined): void { this.w = w; }

  public getStyle(): Record<string, string | undefined> {
    return {
      height: this.h,
      'min-height': this.h,
      width: this.w,
      'min-width': this.w,
    };
  }
}
