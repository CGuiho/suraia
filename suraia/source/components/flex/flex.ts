/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { FlexController };
export type { FlexControllerOptions };

interface FlexControllerOptions {
  direction?: string;
  wrap?: string;
  justify?: string;
  align?: string;
  gap?: string;
}

class FlexController {
  private direction: string;
  private wrap: string;
  private justify: string;
  private align: string;
  private gap: string;

  constructor(options: FlexControllerOptions = {}) {
    this.direction = options.direction ?? 'row';
    this.wrap = options.wrap ?? 'nowrap';
    this.justify = options.justify ?? 'flex-start';
    this.align = options.align ?? 'stretch';
    this.gap = options.gap ?? 'md';
  }

  public getStyle(): Record<string, string> {
    return {
      '--suraia-flex-direction': this.direction,
      '--suraia-flex-wrap': this.wrap,
      '--suraia-flex-justify': this.justify,
      '--suraia-flex-align': this.align,
      '--suraia-flex-gap': `var(--suraia-space-${this.gap === 'md' ? '4' : this.gap})`,
    };
  }
}
