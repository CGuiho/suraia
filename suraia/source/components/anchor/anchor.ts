/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { AnchorController };
export type { AnchorControllerOptions, AnchorUnderline };

type AnchorUnderline = 'always' | 'hover' | 'never';

interface AnchorControllerOptions {
  underline?: AnchorUnderline;
}

class AnchorController {
  private underline: AnchorUnderline;

  constructor(options: AnchorControllerOptions = {}) {
    this.underline = options.underline ?? 'hover';
  }

  public getUnderline(): AnchorUnderline { return this.underline; }
}
