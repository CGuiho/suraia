/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { ProgressController };
export type { ProgressControllerOptions };

interface ProgressControllerOptions {
  value?: number;
  striped?: boolean;
  animated?: boolean;
}

class ProgressController {
  private value: number;
  private striped: boolean;
  private animated: boolean;

  constructor(options: ProgressControllerOptions = {}) {
    this.value = Math.max(0, Math.min(100, options.value ?? 0));
    this.striped = options.striped ?? false;
    this.animated = options.animated ?? false;
  }

  public getValue(): number { return this.value; }

  public setValue(value: number): void {
    this.value = Math.max(0, Math.min(100, value));
  }

  public isStriped(): boolean { return this.striped; }
  public isAnimated(): boolean { return this.animated; }

  public getBarStyle(): Record<string, string> {
    return { width: `${this.value}%` };
  }

  public getAriaAttributes(): Record<string, string> {
    return {
      'aria-valuenow': String(this.value),
      'aria-valuemin': '0',
      'aria-valuemax': '100',
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Progress',
      'data-suraia-striped': this.striped ? '' : undefined,
      'data-suraia-animated': this.animated ? '' : undefined,
    };
  }
}
