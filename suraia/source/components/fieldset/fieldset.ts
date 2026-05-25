/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { FieldsetController };
export type { FieldsetControllerOptions };

interface FieldsetControllerOptions {
  legend?: string;
  disabled?: boolean;
}

class FieldsetController {
  private legend?: string;
  private disabled: boolean;

  constructor(options: FieldsetControllerOptions = {}) {
    this.legend = options.legend;
    this.disabled = options.disabled ?? false;
  }

  public getLegend(): string | undefined { return this.legend; }
  public setLegend(legend: string | undefined): void { this.legend = legend; }

  public isDisabled(): boolean { return this.disabled; }
  public setDisabled(disabled: boolean): void { this.disabled = disabled; }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-disabled': this.disabled ? 'true' : undefined,
    };
  }
}
