/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { TooltipController };
export type { TooltipControllerOptions, TooltipPosition };

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

interface TooltipControllerOptions {
  label?: string;
  position?: TooltipPosition;
  withArrow?: boolean;
  opened?: boolean;
  openDelay?: number;
  closeDelay?: number;
}

class TooltipController {
  private label: string;
  private position: TooltipPosition;
  private withArrow: boolean;
  private opened: boolean;
  private openDelay: number;
  private closeDelay: number;
  private openTimer: ReturnType<typeof setTimeout> | null;
  private closeTimer: ReturnType<typeof setTimeout> | null;

  constructor(options: TooltipControllerOptions = {}) {
    this.label = options.label ?? '';
    this.position = options.position ?? 'top';
    this.withArrow = options.withArrow ?? false;
    this.opened = options.opened ?? false;
    this.openDelay = options.openDelay ?? 0;
    this.closeDelay = options.closeDelay ?? 0;
    this.openTimer = null;
    this.closeTimer = null;
  }

  public getLabel(): string { return this.label; }
  public getPosition(): TooltipPosition { return this.position; }
  public hasArrow(): boolean { return this.withArrow; }
  public isOpened(): boolean { return this.opened; }

  public open(): void {
    if (this.closeTimer) { clearTimeout(this.closeTimer); this.closeTimer = null; }
    if (this.openDelay > 0) {
      this.openTimer = setTimeout(() => { this.opened = true; }, this.openDelay);
    } else {
      this.opened = true;
    }
  }

  public close(): void {
    if (this.openTimer) { clearTimeout(this.openTimer); this.openTimer = null; }
    if (this.closeDelay > 0) {
      this.closeTimer = setTimeout(() => { this.opened = false; }, this.closeDelay);
    } else {
      this.opened = false;
    }
  }

  public destroy(): void {
    if (this.openTimer) clearTimeout(this.openTimer);
    if (this.closeTimer) clearTimeout(this.closeTimer);
  }
}
