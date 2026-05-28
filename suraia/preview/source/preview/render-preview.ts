/** @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved. */

export { renderPreviewHtml, getBaseStyles };

import type { BlueprintRecord } from "../blueprints/types";
import type { ControlState } from "./apply-controls";

import baseTokensCss from "../../../source/themes/base-tokens.css?raw";
import functionsCss from "../../../source/styles/functions.css?raw";
import colorsCss from "../../../source/styles/colors.css?raw";
import fontsCss from "../../../source/styles/fonts.css?raw";
import varsCss from "../../../source/styles/vars.css?raw";
import resetCss from "../../../source/styles/reset.css?raw";

const BASE_STYLES = [
  baseTokensCss,
  functionsCss,
  colorsCss,
  fontsCss,
  varsCss,
  resetCss,
].join("\n\n");

function getBaseStyles(): string {
  return BASE_STYLES;
}

function renderPreviewHtml(
  blueprint: BlueprintRecord,
  controls: ControlState
): string {
  const { variants, states, attributes, colorScheme } = controls;

  let html = blueprint.structureHtml;

  html = replaceSlots(html, blueprint);

  const rootEl = findRootElement(html);
  if (rootEl) {
    html = applyAttributesToRoot(html, rootEl, variants, states, attributes);
  }

  const themeAttr =
    colorScheme === "dark" ? ' data-suraia-color-scheme="dark"' : "";

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
html { font-size: 16px; }
body { margin: 0; padding: 2rem; display: flex; align-items: center; justify-content: center; min-height: 100vh; box-sizing: border-box; }
${BASE_STYLES}
${blueprint.componentCss}
</style>
</head>
<body${themeAttr}>
<div class="suraia-root">
${html}
</div>
</body>
</html>`;
}

function replaceSlots(html: string, blueprint: BlueprintRecord): string {
  for (const [name, desc] of Object.entries(blueprint.slots)) {
    const placeholder = name === "default" ? desc || name : `[${name}]`;
    if (name === "default") {
      html = html.replace(/<slot><\/slot>/g, placeholder);
    } else {
      const regex = new RegExp(
        `<slot\\s+name="${escapeRegex(name)}"><\\/slot>`,
        "g"
      );
      html = html.replace(regex, placeholder);
    }
  }
  html = html.replace(/<slot\b[^>]*><\/slot>/g, "[slot]");
  return html;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findRootElement(html: string): string | null {
  const match = html.match(/<(\w+)[^>]*class="suraia-[^"]*"[^>]*>/);
  if (!match) return null;
  return match[1] ?? null;
}

function applyAttributesToRoot(
  html: string,
  tagName: string,
  variants: Record<string, string>,
  states: string[],
  attributes: Record<string, string | boolean | number>
): string {
  const openTagRegex = new RegExp(`<${tagName}\\b([^>]*)>`);
  const match = html.match(openTagRegex);
  if (!match) return html;

  const existingAttrs = match[1] ?? "";
  let newAttrs = existingAttrs;

  for (const [key, value] of Object.entries(variants)) {
    const attrName = `data-suraia-${key}`;
    newAttrs = setOrReplaceAttr(newAttrs, attrName, value);
  }

  const stateValue = states.join(" ");
  if (stateValue) {
    newAttrs = setOrReplaceAttr(newAttrs, "data-suraia-state", stateValue);
  } else {
    newAttrs = newAttrs.replace(
      /\s*data-suraia-state="[^"]*"/g,
      ""
    );
  }

  for (const [key, value] of Object.entries(attributes)) {
    const attrName = `data-suraia-${key}`;
    if (typeof value === "boolean") {
      if (value) {
        if (!newAttrs.includes(`${attrName}=`)) {
          newAttrs += ` ${attrName}`;
        }
      } else {
        newAttrs = newAttrs.replace(
          new RegExp(`\\s*${escapeRegex(attrName)}(?:="[^"]*")?`, "g"),
          ""
        );
      }
    } else {
      newAttrs = setOrReplaceAttr(newAttrs, attrName, String(value));
    }
  }

  return html.replace(openTagRegex, `<${tagName}${newAttrs}>`);
}

function setOrReplaceAttr(
  attrs: string,
  name: string,
  value: string
): string {
  const regex = new RegExp(`\\s*${escapeRegex(name)}="[^"]*"`, "g");
  if (regex.test(attrs)) {
    return attrs.replace(regex, ` ${name}="${value}"`);
  }
  return `${attrs} ${name}="${value}"`;
}
