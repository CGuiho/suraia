/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { FloatingIndicatorController };
export type { FloatingIndicatorControllerOptions, FloatingIndicatorRect };

interface FloatingIndicatorRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface FloatingIndicatorControllerOptions {
  targetRect?: FloatingIndicatorRect;
  rootRect?: FloatingIndicatorRect;
  transitionDuration?: number;
}

class FloatingIndicatorController {
  private targetRect?: FloatingIndicatorRect;
  private rootRect: FloatingIndicatorRect;
  private transitionDuration: number;

  constructor(options: FloatingIndicatorControllerOptions = {}) {
    this.targetRect = options.targetRect;
    this.rootRect = options.rootRect ?? { x: 0, y: 0, width: 0, height: 0 };
    this.transitionDuration = options.transitionDuration ?? 150;
  }

  public getTargetRect(): FloatingIndicatorRect | undefined {
    return this.targetRect ? { ...this.targetRect } : undefined;
  }

  public setTargetRect(rect?: FloatingIndicatorRect): void {
    this.targetRect = rect;
  }

  public setRootRect(rect: FloatingIndicatorRect): void {
    this.rootRect = rect;
  }

  public isVisible(): boolean {
    return this.targetRect !== undefined;
  }

  public getStyle(): Record<string, string> {
    if (!this.targetRect) {
      return {
        '--suraia-floating-indicator-opacity': '0',
        '--suraia-floating-indicator-duration': `${this.transitionDuration}ms`,
      };
    }

    return {
      '--suraia-floating-indicator-x': `${this.targetRect.x - this.rootRect.x}px`,
      '--suraia-floating-indicator-y': `${this.targetRect.y - this.rootRect.y}px`,
      '--suraia-floating-indicator-width': `${this.targetRect.width}px`,
      '--suraia-floating-indicator-height': `${this.targetRect.height}px`,
      '--suraia-floating-indicator-opacity': '1',
      '--suraia-floating-indicator-duration': `${this.transitionDuration}ms`,
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'FloatingIndicator',
      'data-suraia-visible': String(this.isVisible()),
    };
  }
}
