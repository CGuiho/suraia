/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { BreadcrumbsController };
export type { BreadcrumbsControllerOptions, BreadcrumbItem };

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsControllerOptions {
  items?: BreadcrumbItem[];
  separator?: string;
}

class BreadcrumbsController {
  private items: BreadcrumbItem[];
  private separator: string;

  constructor(options: BreadcrumbsControllerOptions = {}) {
    this.items = options.items ?? [];
    this.separator = options.separator ?? '/';
  }

  public getItems(): BreadcrumbItem[] { return [...this.items]; }
  public getSeparator(): string { return this.separator; }

  public isLast(index: number): boolean {
    return index === this.items.length - 1;
  }
}
