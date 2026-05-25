/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { StackController };
export type { StackControllerOptions };

interface StackControllerOptions {
  gap?: string;
  align?: string;
  justify?: string;
}

class StackController {
  private gap: string;
  private align: string;
  private justify: string;

  constructor(options: StackControllerOptions = {}) {
    this.gap = options.gap ?? 'md';
    this.align = options.align ?? 'stretch';
    this.justify = options.justify ?? 'flex-start';
  }

  public getGap(): string { return this.gap; }
  public setGap(gap: string): void { this.gap = gap; }
  public getAlign(): string { return this.align; }
  public setAlign(align: string): void { this.align = align; }
  public getJustify(): string { return this.justify; }
  public setJustify(justify: string): void { this.justify = justify; }

  public getStyle(): Record<string, string> {
    return {
      '--suraia-stack-gap': this.gap,
      '--suraia-stack-align': this.align,
      '--suraia-stack-justify': this.justify,
    };
  }
}
