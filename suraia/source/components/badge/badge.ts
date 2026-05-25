/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { BadgeController };
export type { BadgeControllerOptions, BadgeVariant, BadgeSize };

type BadgeVariant = 'filled' | 'light' | 'outline' | 'dot' | 'transparent' | 'default' | 'gradient';
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface BadgeControllerOptions {
  variant?: BadgeVariant;
  size?: BadgeSize;
  color?: string;
  radius?: string;
  fullWidth?: boolean;
  circle?: boolean;
}

class BadgeController {
  private variant: BadgeVariant;
  private size: BadgeSize;
  private color: string;
  private fullWidth: boolean;
  private circle: boolean;

  constructor(options: BadgeControllerOptions = {}) {
    this.variant = options.variant ?? 'filled';
    this.size = options.size ?? 'md';
    this.color = options.color ?? 'primary';
    this.fullWidth = options.fullWidth ?? false;
    this.circle = options.circle ?? false;
  }

  public getVariant(): BadgeVariant {
    return this.variant;
  }

  public setVariant(variant: BadgeVariant): void {
    this.variant = variant;
  }

  public getSize(): BadgeSize {
    return this.size;
  }

  public setSize(size: BadgeSize): void {
    this.size = size;
  }

  public getColor(): string {
    return this.color;
  }

  public setColor(color: string): void {
    this.color = color;
  }

  public isFullWidth(): boolean {
    return this.fullWidth;
  }

  public isCircle(): boolean {
    return this.circle;
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Badge',
      'data-suraia-variant': this.variant,
      'data-suraia-size': this.size,
      'data-suraia-block': this.fullWidth ? '' : undefined,
      'data-suraia-circle': this.circle ? '' : undefined,
    };
  }
}
