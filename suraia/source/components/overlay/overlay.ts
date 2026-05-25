/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { OverlayController };
export type { OverlayControllerOptions };

interface OverlayControllerOptions {
  color?: string;
  opacity?: number;
  blur?: number;
  fixed?: boolean;
  zIndex?: number;
}

class OverlayController {
  private color: string;
  private opacity: number;
  private blur: number;
  private fixed: boolean;
  private zIndex: number;

  constructor(options: OverlayControllerOptions = {}) {
    this.color = options.color ?? '#000';
    this.opacity = options.opacity ?? 0.6;
    this.blur = options.blur ?? 0;
    this.fixed = options.fixed ?? false;
    this.zIndex = options.zIndex ?? 200;
  }

  public isFixed(): boolean { return this.fixed; }
  public getBlur(): number { return this.blur; }
  public getZIndex(): number { return this.zIndex; }

  public getStyle(): Record<string, string> {
    const r = parseInt(this.color.slice(1, 3), 16) || 0;
    const g = parseInt(this.color.slice(3, 5), 16) || 0;
    const b = parseInt(this.color.slice(5, 7), 16) || 0;
    return {
      '--suraia-overlay-color': `rgba(${r}, ${g}, ${b}, ${this.opacity})`,
      '--suraia-overlay-blur': `${this.blur}px`,
      'z-index': String(this.zIndex),
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Overlay',
      'data-suraia-fixed': this.fixed ? '' : undefined,
    };
  }
}
