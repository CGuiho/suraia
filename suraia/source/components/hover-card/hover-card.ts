/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { HoverCardController };
export type { HoverCardControllerOptions, HoverCardPosition };

type HoverCardPosition = 'top' | 'right' | 'bottom' | 'left';

interface HoverCardControllerOptions {
  opened?: boolean;
  openDelay?: number;
  closeDelay?: number;
  position?: HoverCardPosition;
  withArrow?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

class HoverCardController {
  private opened: boolean;
  private openDelay: number;
  private closeDelay: number;
  private position: HoverCardPosition;
  private withArrow: boolean;
  private openTimer: ReturnType<typeof setTimeout> | null;
  private closeTimer: ReturnType<typeof setTimeout> | null;
  private onOpen?: () => void;
  private onClose?: () => void;

  constructor(options: HoverCardControllerOptions = {}) {
    this.opened = options.opened ?? false;
    this.openDelay = options.openDelay ?? 300;
    this.closeDelay = options.closeDelay ?? 400;
    this.position = options.position ?? 'bottom';
    this.withArrow = options.withArrow ?? false;
    this.openTimer = null;
    this.closeTimer = null;
    this.onOpen = options.onOpen;
    this.onClose = options.onClose;
  }

  public isOpened(): boolean { return this.opened; }
  public getOpenDelay(): number { return this.openDelay; }
  public getCloseDelay(): number { return this.closeDelay; }
  public getPosition(): HoverCardPosition { return this.position; }
  public hasArrow(): boolean { return this.withArrow; }

  public open(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    if (this.opened) return;

    if (this.openDelay > 0) {
      if (!this.openTimer) {
        this.openTimer = setTimeout(() => {
          this.opened = true;
          this.openTimer = null;
          this.onOpen?.();
        }, this.openDelay);
      }
    } else {
      this.opened = true;
      this.onOpen?.();
    }
  }

  public close(): void {
    if (this.openTimer) {
      clearTimeout(this.openTimer);
      this.openTimer = null;
    }
    if (!this.opened) return;

    if (this.closeDelay > 0) {
      if (!this.closeTimer) {
        this.closeTimer = setTimeout(() => {
          this.opened = false;
          this.closeTimer = null;
          this.onClose?.();
        }, this.closeDelay);
      }
    } else {
      this.opened = false;
      this.onClose?.();
    }
  }

  public cancel(): void {
    if (this.openTimer) {
      clearTimeout(this.openTimer);
      this.openTimer = null;
    }
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  public destroy(): void {
    this.cancel();
  }
}
