/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { AccordionController };
export type { AccordionControllerOptions };

interface AccordionControllerOptions {
  multiple?: boolean;
  defaultValue?: string[];
  items?: string[];
  onChange?: (value: string[]) => void;
}

class AccordionController {
  private multiple: boolean;
  private openItems: Set<string>;
  private items: string[];
  private onChange?: (value: string[]) => void;

  constructor(options: AccordionControllerOptions = {}) {
    this.multiple = options.multiple ?? false;
    this.items = options.items ?? [];
    this.openItems = new Set(options.defaultValue ?? []);
    this.onChange = options.onChange;
  }

  public isOpen(value: string): boolean {
    return this.openItems.has(value);
  }

  public getOpenItems(): string[] {
    return [...this.openItems];
  }

  public toggle(value: string): void {
    if (this.openItems.has(value)) {
      this.openItems.delete(value);
    } else {
      if (!this.multiple) {
        this.openItems.clear();
      }
      this.openItems.add(value);
    }
    this.onChange?.([...this.openItems]);
  }

  public getNextItem(current: string): string {
    const idx = this.items.indexOf(current);
    return this.items[(idx + 1) % this.items.length] ?? current;
  }

  public getPrevItem(current: string): string {
    const idx = this.items.indexOf(current);
    return this.items[(idx - 1 + this.items.length) % this.items.length] ?? current;
  }

  public getFirstItem(): string {
    return this.items[0] ?? '';
  }

  public getLastItem(): string {
    return this.items[this.items.length - 1] ?? '';
  }
}
