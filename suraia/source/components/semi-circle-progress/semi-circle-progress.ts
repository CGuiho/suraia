/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { SemiCircleProgressController };
export type { SemiCircleProgressControllerOptions };

interface SemiCircleProgressControllerOptions {
  value?: number;
  size?: number;
  thickness?: number;
  color?: string;
}

class SemiCircleProgressController {
  private value: number;
  private size: number;
  private thickness: number;
  private color: string;

  constructor(options: SemiCircleProgressControllerOptions = {}) {
    this.value = Math.max(0, Math.min(100, options.value ?? 0));
    this.size = options.size ?? 200;
    this.thickness = options.thickness ?? 16;
    this.color = options.color ?? "primary";
  }

  public getValue(): number { return this.value; }
  public getSize(): number { return this.size; }
  public getThickness(): number { return this.thickness; }
  public getColor(): string { return this.color; }

  public getRadius(): number {
    return (this.size - this.thickness) / 2;
  }

  public getPathLength(): number {
    return Math.PI * this.getRadius();
  }

  public getPathData(): string {
    const r = this.getRadius();
    const startX = this.thickness / 2;
    const startY = this.size - this.thickness / 2;
    const endX = this.size - this.thickness / 2;
    const endY = this.size - this.thickness / 2;
    return `M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`;
  }

  public getStrokeDasharray(): string {
    const length = this.getPathLength();
    return `${length} ${length}`;
  }

  public getStrokeDashoffset(): number {
    const length = this.getPathLength();
    return length - (this.value / 100) * length;
  }

  public getAriaAttributes(): Record<string, string> {
    return {
      'role': 'progressbar',
      'aria-valuenow': String(this.value),
      'aria-valuemin': '0',
      'aria-valuemax': '100',
    };
  }
}
