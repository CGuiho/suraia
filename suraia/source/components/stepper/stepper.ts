/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { StepperController };
export type { StepperControllerOptions, StepperOrientation, StepperStep, StepperStepStatus };

type StepperOrientation = 'horizontal' | 'vertical';
type StepperStepStatus = 'inactive' | 'active' | 'completed';

interface StepperStep {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface StepperControllerOptions {
  steps?: StepperStep[];
  active?: number;
  orientation?: StepperOrientation;
  allowStepSelect?: boolean;
  onChange?: (active: number) => void;
}

class StepperController {
  private steps: StepperStep[];
  private active: number;
  private orientation: StepperOrientation;
  private allowStepSelect: boolean;
  private onChange?: (active: number) => void;

  constructor(options: StepperControllerOptions = {}) {
    this.steps = [...(options.steps ?? [])];
    this.active = this.clampIndex(options.active ?? 0);
    this.orientation = options.orientation ?? 'horizontal';
    this.allowStepSelect = options.allowStepSelect ?? true;
    this.onChange = options.onChange;
  }

  public getSteps(): StepperStep[] {
    return this.steps.map(step => ({ ...step }));
  }

  public getActive(): number {
    return this.active;
  }

  public setActive(index: number): void {
    const next = this.clampIndex(index);
    if (!this.allowStepSelect || this.steps[next]?.disabled) {
      return;
    }

    this.active = next;
    this.onChange?.(next);
  }

  public next(): void {
    const next = this.findEnabledIndex(this.active + 1, 1);
    if (next !== this.active) {
      this.active = next;
      this.onChange?.(next);
    }
  }

  public previous(): void {
    const previous = this.findEnabledIndex(this.active - 1, -1);
    if (previous !== this.active) {
      this.active = previous;
      this.onChange?.(previous);
    }
  }

  public getOrientation(): StepperOrientation {
    return this.orientation;
  }

  public getStepStatus(index: number): StepperStepStatus {
    if (index === this.active) {
      return 'active';
    }
    return index < this.active ? 'completed' : 'inactive';
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Stepper',
      'data-suraia-orientation': this.orientation,
      'data-suraia-active': String(this.active),
    };
  }

  private clampIndex(index: number): number {
    if (this.steps.length === 0) {
      return 0;
    }
    return Math.min(this.steps.length - 1, Math.max(0, index));
  }

  private findEnabledIndex(start: number, direction: 1 | -1): number {
    let index = this.clampIndex(start);
    while (this.steps[index]?.disabled && index > 0 && index < this.steps.length - 1) {
      index += direction;
    }
    return this.steps[index]?.disabled ? this.active : index;
  }
}
