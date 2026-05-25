/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { TitleController };
export type { TitleControllerOptions, HeadingOrder };

type HeadingOrder = 1 | 2 | 3 | 4 | 5 | 6;

interface TitleControllerOptions {
  order?: HeadingOrder;
  size?: `h${HeadingOrder}`;
  truncate?: boolean;
  lineClamp?: number;
}

class TitleController {
  private order: HeadingOrder;
  private size?: string;
  private truncate: boolean;
  private lineClamp?: number;

  constructor(options: TitleControllerOptions = {}) {
    this.order = options.order ?? 1;
    this.size = options.size;
    this.truncate = options.truncate ?? false;
    this.lineClamp = options.lineClamp;
  }

  public getOrder(): HeadingOrder {
    return this.order;
  }

  public setOrder(order: HeadingOrder): void {
    this.order = order;
  }

  public getSize(): string | undefined {
    return this.size;
  }

  public setSize(size: `h${HeadingOrder}` | undefined): void {
    this.size = size;
  }

  /**
   * Returns the HTML tag name based on the order.
   */
  public getTagName(): string {
    return `h${this.order}`;
  }

  /**
   * Returns the visual size — either the explicit size or the order-based default.
   */
  public getVisualSize(): string {
    return this.size ?? `h${this.order}`;
  }

  public isTruncate(): boolean {
    return this.truncate;
  }

  public getLineClamp(): number | undefined {
    return this.lineClamp;
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Title',
      'data-suraia-order': String(this.order),
      'data-suraia-size': this.size,
      'data-suraia-truncate': this.truncate ? '' : undefined,
      'data-suraia-line-clamp': this.lineClamp?.toString(),
    };
  }
}
