/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { MultiSelectController };
export type { MultiSelectControllerOptions, MultiSelectOption };

interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MultiSelectControllerOptions {
  data: MultiSelectOption[];
  value?: string[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  searchable?: boolean;
  error?: string;
  onChange?: (value: string[]) => void;
}

class MultiSelectController {
  private data: MultiSelectOption[];
  private value: string[];
  private placeholder: string;
  private disabled: boolean;
  private required: boolean;
  private searchable: boolean;
  private error?: string;
  private opened: boolean;
  private searchQuery: string;
  private hoveredIndex: number;
  private onChange?: (value: string[]) => void;

  constructor(options: MultiSelectControllerOptions) {
    this.data = options.data;
    this.value = options.value ?? [];
    this.placeholder = options.placeholder ?? "";
    this.disabled = options.disabled ?? false;
    this.required = options.required ?? false;
    this.searchable = options.searchable ?? true;
    this.error = options.error;
    this.opened = false;
    this.searchQuery = "";
    this.hoveredIndex = -1;
    this.onChange = options.onChange;
  }

  public getPlaceholder(): string {
    return this.placeholder;
  }

  public getValue(): string[] {
    return this.value;
  }

  public getSearchQuery(): string {
    return this.searchQuery;
  }

  public isOpened(): boolean {
    return this.opened;
  }

  public isDisabled(): boolean {
    return this.disabled;
  }

  public isRequired(): boolean {
    return this.required;
  }

  public getError(): string | undefined {
    return this.error;
  }

  public getHoveredIndex(): number {
    return this.hoveredIndex;
  }

  public getFilteredOptions(): MultiSelectOption[] {
    if (!this.searchable || this.searchQuery.length === 0) return this.data;
    const q = this.searchQuery.toLowerCase();
    return this.data.filter(o => o.label.toLowerCase().includes(q));
  }

  public getSelectedOptions(): MultiSelectOption[] {
    return this.value.map(val => this.data.find(o => o.value === val)!).filter(Boolean);
  }

  public setSearchQuery(query: string): void {
    if (this.disabled) return;
    this.searchQuery = query;
    this.opened = true;
    this.hoveredIndex = 0;
  }

  public open(): void {
    if (this.disabled) return;
    this.opened = true;
    this.hoveredIndex = -1;
  }

  public close(): void {
    this.opened = false;
    this.searchQuery = "";
    this.hoveredIndex = -1;
  }

  public toggle(): void {
    if (this.opened) this.close(); else this.open();
  }

  public selectValue(val: string): void {
    if (this.disabled) return;
    const opt = this.data.find(o => o.value === val);
    if (!opt || opt.disabled) return;

    if (this.value.includes(val)) {
      this.value = this.value.filter(v => v !== val);
    } else {
      this.value = [...this.value, val];
    }
    this.onChange?.(this.value);
  }

  public deselectValue(val: string): void {
    if (this.disabled) return;
    this.value = this.value.filter(v => v !== val);
    this.onChange?.(this.value);
  }

  public clear(): void {
    if (this.disabled) return;
    this.value = [];
    this.onChange?.([]);
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
    if (opt) {
      this.selectValue(opt.value);
    }
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!this.opened) { this.open(); return; }
      this.hoverNext();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      this.hoverPrev();
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (this.opened) this.selectHovered(); else this.open();
    } else if (event.key === "Escape") {
      this.close();
    } else if (event.key === "Backspace") {
      if (this.searchQuery === "" && this.value.length > 0) {
        this.deselectValue(this.value[this.value.length - 1]!);
      }
    }
  }
}
