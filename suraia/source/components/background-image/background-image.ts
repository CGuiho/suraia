/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { BackgroundImageController };
export type { BackgroundImageControllerOptions };

interface BackgroundImageControllerOptions {
  src: string;
  radius?: string;
}

class BackgroundImageController {
  private src: string;
  private radius: string;

  constructor(options: BackgroundImageControllerOptions) {
    this.src = options.src;
    this.radius = options.radius ?? "none";
  }

  public getSrc(): string {
    return this.src;
  }

  public setSrc(src: string): void {
    this.src = src;
  }

  public getRadius(): string {
    return this.radius;
  }

  public setRadius(radius: string): void {
    this.radius = radius;
  }

  public getStyle(): Record<string, string> {
    return {
      "background-image": `url(${JSON.stringify(this.src)})`,
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      "data-suraia-component": "BackgroundImage",
      "data-suraia-radius": this.radius,
    };
  }
}
