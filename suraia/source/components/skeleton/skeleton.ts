/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { SkeletonController };
export type { SkeletonControllerOptions };

interface SkeletonControllerOptions {
  visible?: boolean;
  height?: string;
  width?: string;
  circle?: boolean;
  animate?: boolean;
}

class SkeletonController {
  private visible: boolean;
  private height?: string;
  private width?: string;
  private circle: boolean;
  private animate: boolean;

  constructor(options: SkeletonControllerOptions = {}) {
    this.visible = options.visible ?? false;
    this.height = options.height;
    this.width = options.width;
    this.circle = options.circle ?? false;
    this.animate = options.animate ?? true;
  }

  public isVisible(): boolean { return this.visible; }
  public setVisible(v: boolean): void { this.visible = v; }
  public isCircle(): boolean { return this.circle; }
  public isAnimated(): boolean { return this.animate; }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Skeleton',
      'data-suraia-visible': this.visible ? '' : undefined,
      'data-suraia-circle': this.circle ? '' : undefined,
      'data-suraia-animate': !this.visible && this.animate ? '' : undefined,
    };
  }

  public getStyle(): Record<string, string | undefined> {
    return {
      height: this.height,
      width: this.width,
    };
  }
}
