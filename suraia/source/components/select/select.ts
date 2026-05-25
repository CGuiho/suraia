/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { SelectController };
export type { SelectControllerOptions, SelectOption };

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectControllerOptions {
  data: SelectOption[];
  value?: string;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: (value: string | null) => void;
}

class SelectController {
  private data: SelectOption[];
  private value: string | null;
  private searchable: boolean;
  private clearable: boolean;
  private disabled: boolean;
  private error?: string;
  private opened: boolean;
  private searchQuery: string;
  private hoveredIndex: number;
  private onChange?: (value: string | null) => void;

  constructor(options: SelectControllerOptions) {
    this.data = options.data;
    this.value = options.value ?? null;
    this.searchable = options.searchable ?? false;
    this.clearable = options.clearable ?? false;
    this.disabled = options.disabled ?? false;
    this.error = options.error;
    this.opened = false;
    this.searchQuery = '';
    this.hoveredIndex = -1;
    this.onChange = options.onChange;
  }

  public getValue(): string | null { return this.value; }
  public isOpened(): boolean { return this.opened; }
  public isDisabled(): boolean { return this.disabled; }
  public isSearchable(): boolean { return this.searchable; }
  public getError(): string | undefined { return this.error; }
  public hasError(): boolean { return this.error !== undefined && this.error.length > 0; }
  public getHoveredIndex(): number { return this.hoveredIndex; }

  public getSelectedLabel(): string {
    const opt = this.data.find(o => o.value === this.value);
    return opt ? opt.label : '';
  }

  public getFilteredOptions(): SelectOption[] {
    if (!this.searchable || this.searchQuery.length === 0) return this.data;
    const q = this.searchQuery.toLowerCase();
    return this.data.filter(o => o.label.toLowerCase().includes(q));
  }

  public open(): void {
    if (this.disabled) return;
    this.opened = true;
    this.hoveredIndex = -1;
    this.searchQuery = '';
  }

  public close(): void {
    this.opened = false;
    this.searchQuery = '';
    this.hoveredIndex = -1;
  }

  public toggle(): void {
    if (this.opened) this.close(); else this.open();
  }

  public select(value: string): void {
    if (this.disabled) return;
    const opt = this.data.find(o => o.value === value);
    if (opt && !opt.disabled) {
      this.value = value;
      this.onChange?.(value);
      this.close();
    }
  }

  public clear(): void {
    if (!this.clearable) return;
    this.value = null;
    this.onChange?.(null);
  }

  public setSearchQuery(query: string): void {
    this.searchQuery = query;
    this.hoveredIndex = 0;
  }

  public hoverNext(): void {
    const filtered = this.getFilteredOptions();
    if (filtered.length === 0) return;
    this.hoveredIndex = (this.hoveredIndex + 1) % filtered.length;
    while (filtered[this.hoveredIndex]?.disabled && this.hoveredIndex < filtered.length - 1) {
      this.hoveredIndex++;
    }
  }

  public hoverPrev(): void {
    const filtered = this.getFilteredOptions();
    if (filtered.length === 0) return;
    this.hoveredIndex = (this.hoveredIndex - 1 + filtered.length) % filtered.length;
    while (filtered[this.hoveredIndex]?.disabled && this.hoveredIndex > 0) {
      this.hoveredIndex--;
    }
  }

  public selectHovered(): void {
    const filtered = this.getFilteredOptions();
    const opt = filtered[this.hoveredIndex];
    if (opt && !opt.disabled) {
      this.select(opt.value);
    }
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!this.opened) { this.open(); return; }
      this.hoverNext();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.hoverPrev();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (this.opened) this.selectHovered(); else this.open();
    } else if (event.key === 'Escape') {
      this.close();
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.hoveredIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      const filtered = this.getFilteredOptions();
      this.hoveredIndex = filtered.length - 1;
    }
  }
}
