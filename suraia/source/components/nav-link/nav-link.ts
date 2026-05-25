/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { NavLinkController };
export type { NavLinkControllerOptions };

interface NavLinkControllerOptions {
  active?: boolean;
  opened?: boolean;
  disabled?: boolean;
  hasChildren?: boolean;
  onChange?: (opened: boolean) => void;
}

class NavLinkController {
  private active: boolean;
  private opened: boolean;
  private disabled: boolean;
  private hasChildren: boolean;
  private onChange?: (opened: boolean) => void;

  constructor(options: NavLinkControllerOptions = {}) {
    this.active = options.active ?? false;
    this.opened = options.opened ?? false;
    this.disabled = options.disabled ?? false;
    this.hasChildren = options.hasChildren ?? false;
    this.onChange = options.onChange;
  }

  public isActive(): boolean { return this.active; }
  public isOpened(): boolean { return this.opened; }
  public isDisabled(): boolean { return this.disabled; }

  public setActive(active: boolean): void { this.active = active; }

  public toggle(): void {
    if (!this.hasChildren || this.disabled) return;
    this.opened = !this.opened;
    this.onChange?.(this.opened);
  }
}
