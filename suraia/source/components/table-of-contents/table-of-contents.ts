/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { TableOfContentsController };
export type { TableOfContentsControllerOptions, TOCHeading };

interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsControllerOptions {
  headings?: TOCHeading[];
  activeId?: string | null;
  onChange?: (activeId: string | null) => void;
}

class TableOfContentsController {
  private headings: TOCHeading[];
  private activeId: string | null;
  private onChange?: (activeId: string | null) => void;

  constructor(options: TableOfContentsControllerOptions = {}) {
    this.headings = options.headings ?? [];
    this.activeId = options.activeId ?? null;
    this.onChange = options.onChange;
  }

  public getHeadings(): TOCHeading[] {
    return this.headings;
  }

  public setHeadings(headings: TOCHeading[]): void {
    this.headings = headings;
  }

  public getActiveId(): string | null {
    return this.activeId;
  }

  public setActiveId(id: string | null): void {
    if (this.activeId !== id) {
      this.activeId = id;
      this.onChange?.(id);
    }
  }

  public isHeadingActive(id: string): boolean {
    return this.activeId === id;
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'TableOfContents',
    };
  }
}
