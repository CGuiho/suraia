/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { DrawerController };
export type { DrawerControllerOptions, DrawerPosition };

type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

interface DrawerControllerOptions {
  opened?: boolean;
  position?: DrawerPosition;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  onClose?: () => void;
}

class DrawerController {
  private opened: boolean;
  private position: DrawerPosition;
  private closeOnClickOutside: boolean;
  private closeOnEscape: boolean;
  private onClose?: () => void;

  constructor(options: DrawerControllerOptions = {}) {
    this.opened = options.opened ?? false;
    this.position = options.position ?? 'left';
    this.closeOnClickOutside = options.closeOnClickOutside ?? true;
    this.closeOnEscape = options.closeOnEscape ?? true;
    this.onClose = options.onClose;
  }

  public isOpened(): boolean { return this.opened; }
  public getPosition(): DrawerPosition { return this.position; }

  public open(): void { this.opened = true; }
  public close(): void { this.opened = false; this.onClose?.(); }

  public handleOverlayClick(): void {
    if (this.closeOnClickOutside) this.close();
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.closeOnEscape) this.close();
  }
}
