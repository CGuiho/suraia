/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { UnstyledButtonController };
export type { UnstyledButtonControllerOptions };

interface UnstyledButtonControllerOptions {
  disabled?: boolean;
}

class UnstyledButtonController {
  private disabled: boolean;

  constructor(options: UnstyledButtonControllerOptions = {}) {
    this.disabled = options.disabled ?? false;
  }

  public isDisabled(): boolean {
    return this.disabled;
  }

  public setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-disabled': this.disabled ? 'true' : undefined,
    };
  }
}
