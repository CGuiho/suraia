/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { FloatingWindowController };
export type { FloatingWindowControllerOptions, FloatingWindowPoint, FloatingWindowSize };

interface FloatingWindowPoint {
  x: number;
  y: number;
}

interface FloatingWindowSize {
  width: number;
  height: number;
}

interface FloatingWindowControllerOptions {
  opened?: boolean;
  position?: FloatingWindowPoint;
  size?: FloatingWindowSize;
  minSize?: FloatingWindowSize;
  maxSize?: FloatingWindowSize;
  onOpenChange?: (opened: boolean) => void;
}

class FloatingWindowController {
  private opened: boolean;
  private position: FloatingWindowPoint;
  private size: FloatingWindowSize;
  private minSize: FloatingWindowSize;
  private maxSize?: FloatingWindowSize;
  private onOpenChange?: (opened: boolean) => void;

  constructor(options: FloatingWindowControllerOptions = {}) {
    this.opened = options.opened ?? false;
    this.position = options.position ?? { x: 0, y: 0 };
    this.size = options.size ?? { width: 360, height: 240 };
    this.minSize = options.minSize ?? { width: 160, height: 120 };
    this.maxSize = options.maxSize;
    this.onOpenChange = options.onOpenChange;
  }

  public isOpened(): boolean {
    return this.opened;
  }

  public open(): void {
    this.setOpened(true);
  }

  public close(): void {
    this.setOpened(false);
  }

  public toggle(): void {
    this.setOpened(!this.opened);
  }

  public getPosition(): FloatingWindowPoint {
    return { ...this.position };
  }

  public setPosition(position: FloatingWindowPoint): void {
    this.position = { ...position };
  }

  public moveBy(delta: FloatingWindowPoint): void {
    this.position = {
      x: this.position.x + delta.x,
      y: this.position.y + delta.y,
    };
  }

  public getSize(): FloatingWindowSize {
    return { ...this.size };
  }

  public setSize(size: FloatingWindowSize): void {
    this.size = {
      width: this.clamp(size.width, this.minSize.width, this.maxSize?.width),
      height: this.clamp(size.height, this.minSize.height, this.maxSize?.height),
    };
  }

  public getStyle(): Record<string, string> {
    return {
      '--suraia-floating-window-x': `${this.position.x}px`,
      '--suraia-floating-window-y': `${this.position.y}px`,
      '--suraia-floating-window-width': `${this.size.width}px`,
      '--suraia-floating-window-height': `${this.size.height}px`,
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'FloatingWindow',
      'data-suraia-opened': String(this.opened),
    };
  }

  private setOpened(opened: boolean): void {
    if (this.opened === opened) {
      return;
    }

    this.opened = opened;
    this.onOpenChange?.(opened);
  }

  private clamp(value: number, min: number, max?: number): number {
    const upperBounded = max === undefined ? value : Math.min(max, value);
    return Math.max(min, upperBounded);
  }
}
