/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { AvatarController };
export type { AvatarControllerOptions };

interface AvatarControllerOptions {
  src?: string;
  alt?: string;
  name?: string;
}

class AvatarController {
  private src?: string;
  private alt: string;
  private name?: string;
  private imageError: boolean;

  constructor(options: AvatarControllerOptions = {}) {
    this.src = options.src;
    this.alt = options.alt ?? '';
    this.name = options.name;
    this.imageError = false;
  }

  public getSrc(): string | undefined { return this.src; }
  public getAlt(): string { return this.alt; }
  public hasImageError(): boolean { return this.imageError; }

  public handleImageError(): void {
    this.imageError = true;
  }

  public shouldShowImage(): boolean {
    return this.src !== undefined && this.src.length > 0 && !this.imageError;
  }

  public getInitials(): string {
    if (!this.name) return '';
    const parts = this.name.trim().split(/\s+/);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
    return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase();
  }
}
