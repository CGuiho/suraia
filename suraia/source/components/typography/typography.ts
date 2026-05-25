/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { TypographyController };
export type { TypographyControllerOptions, TypographyVariant, TypographyWeight, TypographyAlign };

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'lead' | 'blockquote' | 'code';
type TypographyWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

interface TypographyControllerOptions {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  color?: string;
}

class TypographyController {
  private variant: TypographyVariant;
  private weight: TypographyWeight;
  private align: TypographyAlign;
  private color?: string;

  constructor(options: TypographyControllerOptions = {}) {
    this.variant = options.variant ?? 'p';
    this.weight = options.weight ?? 'normal';
    this.align = options.align ?? 'left';
    this.color = options.color;
  }

  public getVariant(): TypographyVariant {
    return this.variant;
  }

  public setVariant(variant: TypographyVariant): void {
    this.variant = variant;
  }

  public getWeight(): TypographyWeight {
    return this.weight;
  }

  public setWeight(weight: TypographyWeight): void {
    this.weight = weight;
  }

  public getAlign(): TypographyAlign {
    return this.align;
  }

  public setAlign(align: TypographyAlign): void {
    this.align = align;
  }

  public getColor(): string | undefined {
    return this.color;
  }

  public setColor(color: string | undefined): void {
    this.color = color;
  }

  public getTagName(): string {
    switch (this.variant) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return this.variant;
      case 'blockquote':
        return 'blockquote';
      case 'code':
        return 'code';
      default:
        return 'p';
    }
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Typography',
      'data-suraia-variant': this.variant,
      'data-suraia-weight': this.weight,
      'data-suraia-align': this.align,
    };
  }

  public getStyle(): Record<string, string | undefined> {
    return {
      color: this.color,
    };
  }
}
