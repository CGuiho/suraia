/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { BurgerController };
export type { BurgerControllerOptions };

interface BurgerControllerOptions {
  opened?: boolean;
  onToggle?: (opened: boolean) => void;
}

class BurgerController {
  private opened: boolean;
  private onToggle?: (opened: boolean) => void;

  constructor(options: BurgerControllerOptions = {}) {
    this.opened = options.opened ?? false;
    this.onToggle = options.onToggle;
  }

  public isOpened(): boolean { return this.opened; }

  public toggle(): void {
    this.opened = !this.opened;
    this.onToggle?.(this.opened);
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Burger',
      'data-suraia-opened': this.opened ? '' : undefined,
    };
  }
}
