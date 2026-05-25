/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { NotificationController };
export type { NotificationControllerOptions };

interface NotificationControllerOptions {
  title?: string;
  message?: string;
  color?: string;
  withCloseButton?: boolean;
  autoClose?: number;
  onClose?: () => void;
}

class NotificationController {
  private title?: string;
  private message: string;
  private color: string;
  private withCloseButton: boolean;
  private closed: boolean;
  private autoClose?: number;
  private autoCloseTimer: ReturnType<typeof setTimeout> | null;
  private onClose?: () => void;

  constructor(options: NotificationControllerOptions = {}) {
    this.title = options.title;
    this.message = options.message ?? '';
    this.color = options.color ?? 'primary';
    this.withCloseButton = options.withCloseButton ?? true;
    this.closed = false;
    this.autoClose = options.autoClose;
    this.autoCloseTimer = null;
    this.onClose = options.onClose;
  }

  public getTitle(): string | undefined { return this.title; }
  public getMessage(): string { return this.message; }
  public getColor(): string { return this.color; }
  public hasCloseButton(): boolean { return this.withCloseButton; }
  public isClosed(): boolean { return this.closed; }

  public show(): void {
    this.closed = false;
    if (this.autoClose && this.autoClose > 0) {
      this.autoCloseTimer = setTimeout(() => this.close(), this.autoClose);
    }
  }

  public close(): void {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = null;
    }
    this.closed = true;
    this.onClose?.();
  }

  public destroy(): void {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = null;
    }
  }
}
