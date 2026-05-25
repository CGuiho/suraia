/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { ListController };
export type { ListControllerOptions, ListItem, ListSpacing, ListType };

type ListType = 'ordered' | 'unordered';
type ListSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ListItem {
  id: string;
  label: string;
  icon?: string;
}

interface ListControllerOptions {
  type?: ListType;
  spacing?: ListSpacing;
  withPadding?: boolean;
  center?: boolean;
  items?: ListItem[];
}

class ListController {
  private type: ListType;
  private spacing: ListSpacing;
  private withPadding: boolean;
  private center: boolean;
  private items: ListItem[];

  constructor(options: ListControllerOptions = {}) {
    this.type = options.type ?? 'unordered';
    this.spacing = options.spacing ?? 'sm';
    this.withPadding = options.withPadding ?? true;
    this.center = options.center ?? false;
    this.items = [...(options.items ?? [])];
  }

  public getType(): ListType {
    return this.type;
  }

  public setType(type: ListType): void {
    this.type = type;
  }

  public getTagName(): 'ol' | 'ul' {
    return this.type === 'ordered' ? 'ol' : 'ul';
  }

  public getItems(): ListItem[] {
    return this.items.map(item => ({ ...item }));
  }

  public addItem(item: ListItem): void {
    this.items = [...this.items, item];
  }

  public removeItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'List',
      'data-suraia-type': this.type,
      'data-suraia-spacing': this.spacing,
      'data-suraia-with-padding': String(this.withPadding),
      'data-suraia-center': String(this.center),
    };
  }
}
