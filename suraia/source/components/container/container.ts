/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { ContainerController };
export type { ContainerControllerOptions };

interface ContainerControllerOptions {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fluid?: boolean;
}

class ContainerController {
  private size: string;
  private fluid: boolean;

  constructor(options: ContainerControllerOptions = {}) {
    this.size = options.size ?? 'md';
    this.fluid = options.fluid ?? false;
  }

  public getSize(): string { return this.size; }
  public isFluid(): boolean { return this.fluid; }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Container',
      'data-suraia-size': this.size,
      'data-suraia-fluid': this.fluid ? '' : undefined,
    };
  }
}
