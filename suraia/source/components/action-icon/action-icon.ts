/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { ActionIconController };
export type { ActionIconControllerOptions, ActionIconVariant };

type ActionIconVariant = 'filled' | 'light' | 'outline' | 'subtle' | 'transparent' | 'default' | 'gradient';

interface ActionIconControllerOptions {
  variant?: ActionIconVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

class ActionIconController {
  private variant: ActionIconVariant;
  private size: string;
  private disabled: boolean;
  private loading: boolean;
  private onClick?: (event: MouseEvent | KeyboardEvent) => void;

  constructor(options: ActionIconControllerOptions = {}) {
    this.variant = options.variant ?? 'subtle';
    this.size = options.size ?? 'md';
    this.disabled = options.disabled ?? false;
    this.loading = options.loading ?? false;
    this.onClick = options.onClick;
  }

  public getVariant(): ActionIconVariant { return this.variant; }
  public setVariant(v: ActionIconVariant): void { this.variant = v; }
  public getSize(): string { return this.size; }
  public isDisabled(): boolean { return this.disabled; }
  public setDisabled(d: boolean): void { this.disabled = d; }
  public isLoading(): boolean { return this.loading; }
  public setLoading(l: boolean): void { this.loading = l; }

  public trigger(event: MouseEvent | KeyboardEvent): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.onClick?.(event);
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      event.preventDefault();
      this.trigger(event);
    }
  }

  public getDataAttributes(): Record<string, string | undefined> {
    const states: string[] = [];
    if (this.disabled) states.push('disabled');
    if (this.loading) states.push('loading');
    return {
      'data-suraia-component': 'ActionIcon',
      'data-suraia-variant': this.variant,
      'data-suraia-size': this.size,
      'data-suraia-state': states.length > 0 ? states.join(' ') : undefined,
    };
  }
}
