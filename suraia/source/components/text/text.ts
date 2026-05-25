/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { TextController };
export type { TextControllerOptions };

interface TextControllerOptions {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'text' | 'gradient';
  truncate?: 'end' | 'start';
  lineClamp?: number;
  inline?: boolean;
  inherit?: boolean;
  span?: boolean;
}

class TextController {
  private size: string;
  private variant: string;
  private truncate?: string;
  private lineClamp?: number;
  private inline: boolean;
  private inherit: boolean;
  private span: boolean;

  constructor(options: TextControllerOptions = {}) {
    this.size = options.size ?? 'md';
    this.variant = options.variant ?? 'text';
    this.truncate = options.truncate;
    this.lineClamp = options.lineClamp;
    this.inline = options.inline ?? false;
    this.inherit = options.inherit ?? false;
    this.span = options.span ?? false;
  }

  public getSize(): string {
    return this.size;
  }

  public setSize(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): void {
    this.size = size;
  }

  public getVariant(): string {
    return this.variant;
  }

  public setVariant(variant: 'text' | 'gradient'): void {
    this.variant = variant;
  }

  public getTruncate(): string | undefined {
    return this.truncate;
  }

  public setTruncate(truncate: 'end' | 'start' | undefined): void {
    this.truncate = truncate;
  }

  public getLineClamp(): number | undefined {
    return this.lineClamp;
  }

  public setLineClamp(lineClamp: number | undefined): void {
    this.lineClamp = lineClamp;
  }

  public isInline(): boolean {
    return this.inline;
  }

  public isInherit(): boolean {
    return this.inherit;
  }

  public isSpan(): boolean {
    return this.span;
  }

  /**
   * Returns the HTML tag name based on the span option.
   */
  public getTagName(): string {
    return this.span ? 'span' : 'p';
  }

  /**
   * Returns the data attributes for the current state.
   */
  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Text',
      'data-suraia-size': this.size,
      'data-suraia-variant': this.variant,
      'data-suraia-truncate': this.truncate,
      'data-suraia-line-clamp': this.lineClamp?.toString(),
      'data-suraia-inline': this.inline ? '' : undefined,
      'data-suraia-inherit': this.inherit ? '' : undefined,
    };
  }
}
