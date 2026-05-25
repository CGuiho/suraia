/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { TableController };
export type { TableControllerOptions };

interface TableControllerOptions {
  striped?: boolean;
  highlightOnHover?: boolean;
  withTableBorder?: boolean;
  withColumnBorders?: boolean;
  withRowBorders?: boolean;
  stickyHeader?: boolean;
}

class TableController {
  private striped: boolean;
  private highlightOnHover: boolean;
  private withTableBorder: boolean;
  private withColumnBorders: boolean;
  private withRowBorders: boolean;
  private stickyHeader: boolean;

  constructor(options: TableControllerOptions = {}) {
    this.striped = options.striped ?? false;
    this.highlightOnHover = options.highlightOnHover ?? false;
    this.withTableBorder = options.withTableBorder ?? false;
    this.withColumnBorders = options.withColumnBorders ?? false;
    this.withRowBorders = options.withRowBorders ?? true;
    this.stickyHeader = options.stickyHeader ?? false;
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Table',
      'data-suraia-striped': this.striped ? '' : undefined,
      'data-suraia-highlight-on-hover': this.highlightOnHover ? '' : undefined,
      'data-suraia-with-table-border': this.withTableBorder ? '' : undefined,
      'data-suraia-with-column-borders': this.withColumnBorders ? '' : undefined,
      'data-suraia-with-row-borders': this.withRowBorders ? '' : undefined,
      'data-suraia-sticky-header': this.stickyHeader ? '' : undefined,
    };
  }
}
