/** @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved. */

export interface VariantDefinition {
  options: string[];
  default: string;
}

export interface AttributeDefinition {
  type: string;
  enum?: string[];
  default?: string | number | boolean;
  description?: string;
}

export interface SlotDefinition {
  [slotName: string]: string;
}

export interface ComponentSpec {
  name: string;
  description: string;
  tier?: number;
  dependencies?: string[];
  variants: Record<string, VariantDefinition>;
  states: string[];
  slots: Record<string, string>;
  attributes: Record<string, AttributeDefinition>;
  accessibility: {
    role: string;
    keyboardNavigation: unknown[];
    aria: Record<string, string>;
  };
}

export interface BlueprintRecord {
  slug: string;
  name: string;
  description: string;
  tier: number;
  category: string;
  dependencies: string[];
  variants: Record<string, VariantDefinition>;
  states: string[];
  attributes: Record<string, AttributeDefinition>;
  slots: Record<string, string>;
  accessibility: ComponentSpec["accessibility"];
  structureHtml: string;
  componentCss: string;
  controllerTs: string;
  guideMarkdown: string;
  testTs: string;
  paths: Record<string, string>;
  problems: string[];
}

export type CategoryMap = Record<string, string>;
