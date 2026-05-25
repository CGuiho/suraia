/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { ImageController };
export type { ImageControllerOptions };

interface ImageControllerOptions {
  src: string;
  alt?: string;
  fit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  radius?: string;
  fallbackSrc?: string;
}

class ImageController {
  private src: string;
  private alt: string;
  private fit: "cover" | "contain" | "fill" | "none" | "scale-down";
  private radius: string;
  private fallbackSrc?: string;
  private error: boolean = false;

  constructor(options: ImageControllerOptions) {
    this.src = options.src;
    this.alt = options.alt ?? "";
    this.fit = options.fit ?? "cover";
    this.radius = options.radius ?? "none";
    this.fallbackSrc = options.fallbackSrc;
  }

  public getSrc(): string {
    if (this.error && this.fallbackSrc) {
      return this.fallbackSrc;
    }
    return this.src;
  }

  public setSrc(src: string): void {
    this.src = src;
    this.error = false;
  }

  public getAlt(): string {
    return this.alt;
  }

  public setAlt(alt: string): void {
    this.alt = alt;
  }

  public getFit(): "cover" | "contain" | "fill" | "none" | "scale-down" {
    return this.fit;
  }

  public setFit(fit: "cover" | "contain" | "fill" | "none" | "scale-down"): void {
    this.fit = fit;
  }

  public getRadius(): string {
    return this.radius;
  }

  public setRadius(radius: string): void {
    this.radius = radius;
  }

  public getFallbackSrc(): string | undefined {
    return this.fallbackSrc;
  }

  public setFallbackSrc(fallbackSrc?: string): void {
    this.fallbackSrc = fallbackSrc;
  }

  public handleError(): void {
    this.error = true;
  }

  public isError(): boolean {
    return this.error;
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      "data-suraia-component": "Image",
      "data-suraia-radius": this.radius,
      "data-suraia-fit": this.fit,
      "data-suraia-error": this.error ? "" : undefined,
    };
  }
}
