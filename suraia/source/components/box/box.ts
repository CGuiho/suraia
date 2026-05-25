/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { BoxController };
export type { BoxControllerOptions };

interface BoxControllerOptions {
  component?: string;
}

class BoxController {
  private component: string;

  constructor(options: BoxControllerOptions = {}) {
    this.component = options.component ?? 'div';
  }

  public getComponent(): string {
    return this.component;
  }

  public setComponent(component: string): void {
    this.component = component;
  }
}
