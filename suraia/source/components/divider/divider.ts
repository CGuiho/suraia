/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { DividerController };
export type { DividerControllerOptions, DividerOrientation, DividerLabelPosition };

type DividerOrientation = 'horizontal' | 'vertical';
type DividerLabelPosition = 'left' | 'center' | 'right';

interface DividerControllerOptions {
  orientation?: DividerOrientation;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  labelPosition?: DividerLabelPosition;
  color?: string;
}

class DividerController {
  private orientation: DividerOrientation;
  private size: string;
  private label?: string;
  private labelPosition: DividerLabelPosition;

  constructor(options: DividerControllerOptions = {}) {
    this.orientation = options.orientation ?? 'horizontal';
    this.size = options.size ?? 'xs';
    this.label = options.label;
    this.labelPosition = options.labelPosition ?? 'center';
  }

  public getOrientation(): DividerOrientation { return this.orientation; }
  public setOrientation(o: DividerOrientation): void { this.orientation = o; }
  public getSize(): string { return this.size; }
  public getLabel(): string | undefined { return this.label; }
  public setLabel(label: string | undefined): void { this.label = label; }
  public getLabelPosition(): DividerLabelPosition { return this.labelPosition; }
  public hasLabel(): boolean { return this.label !== undefined && this.label.length > 0; }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Divider',
      'data-suraia-orientation': this.orientation,
      'data-suraia-size': this.size,
      'data-suraia-with-label': this.hasLabel() ? '' : undefined,
    };
  }
}
