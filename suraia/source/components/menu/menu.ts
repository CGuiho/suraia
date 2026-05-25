/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { MenuController };
export type { MenuControllerOptions };

interface MenuControllerOptions {
  opened?: boolean;
  closeOnItemClick?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

class MenuController {
  private opened: boolean;
  private closeOnItemClick: boolean;
  private hoveredIndex: number;
  private itemCount: number;
  private onOpen?: () => void;
  private onClose?: () => void;

  constructor(options: MenuControllerOptions = {}) {
    this.opened = options.opened ?? false;
    this.closeOnItemClick = options.closeOnItemClick ?? true;
    this.hoveredIndex = -1;
    this.itemCount = 0;
    this.onOpen = options.onOpen;
    this.onClose = options.onClose;
  }

  public isOpened(): boolean { return this.opened; }
  public getHoveredIndex(): number { return this.hoveredIndex; }

  public setItemCount(count: number): void { this.itemCount = count; }

  public open(): void {
    this.opened = true;
    this.hoveredIndex = -1;
    this.onOpen?.();
  }

  public close(): void {
    this.opened = false;
    this.hoveredIndex = -1;
    this.onClose?.();
  }

  public toggle(): void {
    if (this.opened) this.close(); else this.open();
  }

  public hoverNext(): void {
    if (this.itemCount === 0) return;
    this.hoveredIndex = (this.hoveredIndex + 1) % this.itemCount;
  }

  public hoverPrev(): void {
    if (this.itemCount === 0) return;
    this.hoveredIndex = (this.hoveredIndex - 1 + this.itemCount) % this.itemCount;
  }

  public selectItem(): boolean {
    if (this.closeOnItemClick) {
      this.close();
    }
    return this.hoveredIndex >= 0;
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!this.opened) { this.open(); return; }
      this.hoverNext();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.hoverPrev();
    } else if (event.key === 'Enter' || event.key === ' ') {
      if (this.opened) { event.preventDefault(); this.selectItem(); }
    } else if (event.key === 'Escape') {
      this.close();
    }
  }
}
