/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { ButtonController };
export type { ButtonControllerOptions };

interface ButtonControllerOptions {
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

class ButtonController {
  private disabled: boolean;
  private loading: boolean;
  private onClick?: (event: MouseEvent | KeyboardEvent) => void;

  constructor(options: ButtonControllerOptions = {}) {
    this.disabled = options.disabled ?? false;
    this.loading = options.loading ?? false;
    this.onClick = options.onClick;
  }

  /**
   * Sets the disabled state.
   */
  public setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  /**
   * Gets the current disabled state.
   */
  public isDisabled(): boolean {
    return this.disabled;
  }

  /**
   * Sets the loading state.
   */
  public setLoading(loading: boolean): void {
    this.loading = loading;
  }

  /**
   * Gets the current loading state.
   */
  public isLoading(): boolean {
    return this.loading;
  }

  /**
   * Triggers the button action if not disabled or loading.
   */
  public trigger(event: MouseEvent | KeyboardEvent): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.onClick?.(event);
  }

  /**
   * Handles keyboard focus execution trigger.
   */
  public handleKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      event.preventDefault();
      this.trigger(event);
    }
  }
}
