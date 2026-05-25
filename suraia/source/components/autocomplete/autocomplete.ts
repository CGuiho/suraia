/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { AutocompleteController };
export type { AutocompleteControllerOptions, AutocompleteItem };

interface AutocompleteItem {
  value: string;
  disabled?: boolean;
}

interface AutocompleteControllerOptions {
  data: (string | AutocompleteItem)[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  onChange?: (value: string) => void;
}

class AutocompleteController {
  private data: AutocompleteItem[];
  private value: string;
  private placeholder: string;
  private disabled: boolean;
  private required: boolean;
  private error?: string;
  private opened: boolean;
  private hoveredIndex: number;
  private onChange?: (value: string) => void;

  constructor(options: AutocompleteControllerOptions) {
    this.data = options.data.map(item =>
      typeof item === "string" ? { value: item } : item
    );
    this.value = options.value ?? "";
    this.placeholder = options.placeholder ?? "";
    this.disabled = options.disabled ?? false;
    this.required = options.required ?? false;
    this.error = options.error;
    this.opened = false;
    this.hoveredIndex = -1;
    this.onChange = options.onChange;
  }

  public getPlaceholder(): string {
    return this.placeholder;
  }

  public getValue(): string {
    return this.value;
  }

  public setValue(val: string): void {
    if (this.disabled) return;
    this.value = val;
    this.onChange?.(val);

    const filtered = this.getFilteredOptions();
    if (filtered.length > 0 && val.trim() !== "") {
      this.opened = true;
    } else {
      this.opened = false;
    }
    this.hoveredIndex = 0;
  }

  public isOpened(): boolean {
    return this.opened && this.value.trim() !== "";
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

  public getFilteredOptions(): AutocompleteItem[] {
    if (this.value.trim() === "") return [];
    const query = this.value.toLowerCase();
    return this.data.filter(item => item.value.toLowerCase().includes(query));
  }

  public open(): void {
    if (this.disabled) return;
    const filtered = this.getFilteredOptions();
    if (filtered.length > 0) {
      this.opened = true;
    }
  }

  public close(): void {
    this.opened = false;
    this.hoveredIndex = -1;
  }

  public selectSuggestion(item: AutocompleteItem): void {
    if (this.disabled || item.disabled) return;
    this.value = item.value;
    this.onChange?.(item.value);
    this.close();
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
    const item = filtered[this.hoveredIndex];
    if (item) {
      this.selectSuggestion(item);
    }
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!this.opened) {
        this.open();
        return;
      }
      this.hoverNext();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (this.opened) {
        this.hoverPrev();
      }
    } else if (event.key === "Enter") {
      if (this.opened && this.hoveredIndex >= 0) {
        event.preventDefault();
        this.selectHovered();
      }
    } else if (event.key === "Escape") {
      this.close();
    }
  }
}
