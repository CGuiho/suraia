/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { TimelineController };
export type { TimelineControllerOptions };

interface TimelineControllerOptions {
  active?: number;
  reverseActive?: boolean;
  bulletSize?: number;
  align?: 'left' | 'right';
}

class TimelineController {
  private active: number;
  private reverseActive: boolean;
  private bulletSize: number;
  private align: 'left' | 'right';

  constructor(options: TimelineControllerOptions = {}) {
    this.active = options.active ?? -1;
    this.reverseActive = options.reverseActive ?? false;
    this.bulletSize = options.bulletSize ?? 20;
    this.align = options.align ?? 'left';
  }

  public getActive(): number { return this.active; }
  public setActive(active: number): void { this.active = active; }

  public isReverseActive(): boolean { return this.reverseActive; }
  public setReverseActive(reverseActive: boolean): void { this.reverseActive = reverseActive; }

  public getBulletSize(): number { return this.bulletSize; }
  public setBulletSize(bulletSize: number): void { this.bulletSize = bulletSize; }

  public getAlign(): 'left' | 'right' { return this.align; }
  public setAlign(align: 'left' | 'right'): void { this.align = align; }

  public isItemActive(index: number, total: number): boolean {
    if (this.active === -1) return false;
    if (this.reverseActive) {
      return index >= total - 1 - this.active;
    }
    return index <= this.active;
  }

  public isItemLineActive(index: number, total: number): boolean {
    if (this.active === -1) return false;
    if (this.reverseActive) {
      return index > total - 1 - this.active;
    }
    return index < this.active;
  }

  public getStyle(): Record<string, string | undefined> {
    return {
      '--suraia-timeline-bullet-size': `${this.bulletSize}px`,
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-align': this.align,
    };
  }
}
