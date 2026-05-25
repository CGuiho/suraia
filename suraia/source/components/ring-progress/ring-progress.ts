/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { RingProgressController };
export type { RingProgressControllerOptions, RingProgressSection };

interface RingProgressSection {
  value: number;
  color: string;
}

interface RingProgressControllerOptions {
  value?: number;
  sections?: RingProgressSection[];
  size?: number;
  thickness?: number;
  roundCaps?: boolean;
}

class RingProgressController {
  private value: number;
  private sections: RingProgressSection[];
  private size: number;
  private thickness: number;
  private roundCaps: boolean;

  constructor(options: RingProgressControllerOptions = {}) {
    this.value = Math.max(0, Math.min(100, options.value ?? 0));
    this.sections = options.sections ?? [];
    this.size = options.size ?? 120;
    this.thickness = options.thickness ?? 12;
    this.roundCaps = options.roundCaps ?? false;

    if (this.sections.length === 0 && this.value > 0) {
      this.sections = [{ value: this.value, color: "primary" }];
    }
  }

  public getValue(): number { return this.value; }
  public getSections(): RingProgressSection[] { return [...this.sections]; }
  public getSize(): number { return this.size; }
  public getThickness(): number { return this.thickness; }
  public hasRoundCaps(): boolean { return this.roundCaps; }

  public getRadius(): number {
    return (this.size - this.thickness) / 2;
  }

  public getCircumference(): number {
    return 2 * Math.PI * this.getRadius();
  }

  public getSectionCalculations(): Array<{
    value: number;
    color: string;
    strokeDasharray: string;
    strokeDashoffset: number;
    transform: string;
  }> {
    const circumference = this.getCircumference();
    const center = this.size / 2;
    let accumulatedPercent = 0;

    return this.sections.map(section => {
      const sectionPercentage = Math.max(0, Math.min(100, section.value));
      const strokeLength = (sectionPercentage / 100) * circumference;
      const strokeDashoffset = circumference - strokeLength;
      
      const angle = -90 + (accumulatedPercent / 100) * 360;
      accumulatedPercent += sectionPercentage;

      return {
        value: sectionPercentage,
        color: section.color,
        strokeDasharray: `${circumference} ${circumference}`,
        strokeDashoffset,
        transform: `rotate(${angle} ${center} ${center})`,
      };
    });
  }

  public getAriaAttributes(): Record<string, string> {
    const total = this.sections.reduce((acc, s) => acc + s.value, 0) || this.value;
    return {
      'role': 'progressbar',
      'aria-valuenow': String(Math.min(100, total)),
      'aria-valuemin': '0',
      'aria-valuemax': '100',
    };
  }
}
