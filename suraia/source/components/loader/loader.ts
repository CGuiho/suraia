/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { LoaderController };
export type { LoaderControllerOptions, LoaderType };

type LoaderType = 'oval' | 'bars' | 'dots';

interface LoaderControllerOptions {
  type?: LoaderType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

class LoaderController {
  private type: LoaderType;
  private size: string;
  private color: string;

  constructor(options: LoaderControllerOptions = {}) {
    this.type = options.type ?? 'oval';
    this.size = options.size ?? 'md';
    this.color = options.color ?? 'primary';
  }

  public getType(): LoaderType { return this.type; }
  public setType(type: LoaderType): void { this.type = type; }
  public getSize(): string { return this.size; }
  public getColor(): string { return this.color; }

  public getClassName(): string {
    return `suraia-loader suraia-loader-${this.type}`;
  }

  public getChildCount(): number {
    if (this.type === 'bars') return 4;
    if (this.type === 'dots') return 3;
    return 0;
  }
}
