/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { CloseButtonController };
export type { CloseButtonControllerOptions };

interface CloseButtonControllerOptions {
  disabled?: boolean;
  onClick?: () => void;
}

class CloseButtonController {
  private disabled: boolean;
  private onClick?: () => void;

  constructor(options: CloseButtonControllerOptions = {}) {
    this.disabled = options.disabled ?? false;
    this.onClick = options.onClick;
  }

  public isDisabled(): boolean { return this.disabled; }

  public trigger(): void {
    if (!this.disabled) this.onClick?.();
  }
}
