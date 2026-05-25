/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { PopoverController };
export type { PopoverControllerOptions, PopoverPosition };

type PopoverPosition = 'top' | 'right' | 'bottom' | 'left';

interface PopoverControllerOptions {
  opened?: boolean;
  position?: PopoverPosition;
  withArrow?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  offset?: number;
  onOpen?: () => void;
  onClose?: () => void;
}

class PopoverController {
  private opened: boolean;
  private position: PopoverPosition;
  private withArrow: boolean;
  private closeOnClickOutside: boolean;
  private closeOnEscape: boolean;
  private offset: number;
  private onOpen?: () => void;
  private onClose?: () => void;

  constructor(options: PopoverControllerOptions = {}) {
    this.opened = options.opened ?? false;
    this.position = options.position ?? 'bottom';
    this.withArrow = options.withArrow ?? true;
    this.closeOnClickOutside = options.closeOnClickOutside ?? true;
    this.closeOnEscape = options.closeOnEscape ?? true;
    this.offset = options.offset ?? 8;
    this.onOpen = options.onOpen;
    this.onClose = options.onClose;
  }

  public isOpened(): boolean { return this.opened; }
  public getPosition(): PopoverPosition { return this.position; }
  public hasArrow(): boolean { return this.withArrow; }
  public getOffset(): number { return this.offset; }

  public open(): void {
    if (!this.opened) {
      this.opened = true;
      this.onOpen?.();
    }
  }

  public close(): void {
    if (this.opened) {
      this.opened = false;
      this.onClose?.();
    }
  }

  public toggle(): void {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  public handleDocumentClick(event: MouseEvent, targetElement: HTMLElement, popoverElement: HTMLElement): void {
    if (!this.closeOnClickOutside || !this.opened) return;
    const clickedTarget = targetElement.contains(event.target as Node);
    const clickedPopover = popoverElement.contains(event.target as Node);
    if (!clickedTarget && !clickedPopover) {
      this.close();
    }
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (this.closeOnEscape && event.key === 'Escape' && this.opened) {
      this.close();
    }
  }
}
