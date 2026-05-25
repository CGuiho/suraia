/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { ModalController };
export type { ModalControllerOptions };

interface ModalControllerOptions {
  opened?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  onClose?: () => void;
}

class ModalController {
  private opened: boolean;
  private closeOnClickOutside: boolean;
  private closeOnEscape: boolean;
  private onClose?: () => void;

  constructor(options: ModalControllerOptions = {}) {
    this.opened = options.opened ?? false;
    this.closeOnClickOutside = options.closeOnClickOutside ?? true;
    this.closeOnEscape = options.closeOnEscape ?? true;
    this.onClose = options.onClose;
  }

  public isOpened(): boolean { return this.opened; }

  public open(): void {
    this.opened = true;
  }

  public close(): void {
    this.opened = false;
    this.onClose?.();
  }

  public handleOverlayClick(): void {
    if (this.closeOnClickOutside) this.close();
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.closeOnEscape) {
      this.close();
    }
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Modal',
      'data-suraia-opened': this.opened ? '' : undefined,
    };
  }
}
