/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { PillController };
export type { PillControllerOptions };

interface PillControllerOptions {
  label: string;
  disabled?: boolean;
  withRemoveButton?: boolean;
  onRemove?: () => void;
}

class PillController {
  private label: string;
  private disabled: boolean;
  private withRemoveButton: boolean;
  private onRemove?: () => void;

  constructor(options: PillControllerOptions) {
    this.label = options.label;
    this.disabled = options.disabled ?? false;
    this.withRemoveButton = options.withRemoveButton ?? false;
    this.onRemove = options.onRemove;
  }

  public getLabel(): string {
    return this.label;
  }

  public isDisabled(): boolean {
    return this.disabled;
  }

  public hasRemoveButton(): boolean {
    return this.withRemoveButton;
  }

  public remove(): void {
    if (this.disabled) return;
    this.onRemove?.();
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;
    if (this.withRemoveButton && (event.key === "Backspace" || event.key === "Delete")) {
      event.preventDefault();
      this.remove();
    }
  }
}
