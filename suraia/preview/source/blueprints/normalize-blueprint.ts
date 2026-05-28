/** @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved. */

export { normalizeBlueprint };

import type { BlueprintRecord, ComponentSpec } from "./types";
import { CATEGORY_MAP } from "./categories";

const EXPECTED_FILES = [
  ".json",
  ".structure.html",
  ".css",
  ".ts",
  ".md",
  "test.ts",
];

function normalizeBlueprint(
  slug: string,
  files: Record<string, string>
): BlueprintRecord {
  const problems: string[] = [];

  for (const suffix of EXPECTED_FILES) {
    if (!files[suffix]) {
      if (suffix === "test.ts") {
        problems.push(`Missing file: ${slug}.test.ts`);
      } else {
        problems.push(`Missing file: ${slug}${suffix}`);
      }
    }
  }

  let spec: ComponentSpec;
  try {
    const raw = files[".json"] ?? "{}";
    spec = JSON.parse(raw) as ComponentSpec;
  } catch {
    spec = {
      name: slug,
      description: "",
      variants: {},
      states: [],
      slots: {},
      attributes: {},
      accessibility: { role: "", keyboardNavigation: [], aria: {} },
    };
    if (files[".json"]) {
      problems.push("Invalid JSON spec");
    }
  }

  const tier = typeof spec.tier === "number" ? spec.tier : 1;
  const category = CATEGORY_MAP[slug] ?? "Miscellaneous";
  const dependencies = Array.isArray(spec.dependencies)
    ? spec.dependencies
    : [];

  const blueprint: BlueprintRecord = {
    slug,
    name: spec.name || slug,
    description: spec.description || "",
    tier,
    category,
    dependencies,
    variants: spec.variants || {},
    states: spec.states || [],
    attributes: spec.attributes || {},
    slots: spec.slots || {},
    accessibility: spec.accessibility || {
      role: "",
      keyboardNavigation: [],
      aria: {},
    },
    structureHtml: files[".structure.html"] ?? "",
    componentCss: files[".css"] ?? "",
    controllerTs: files[".ts"] ?? "",
    guideMarkdown: files[".md"] ?? "",
    testTs: files["test.ts"] ?? "",
    paths: {
      json: files[".json"] ? `${slug}.json` : "",
      structure: files[".structure.html"] ? `${slug}.structure.html` : "",
      css: files[".css"] ? `${slug}.css` : "",
      ts: files[".ts"] ? `${slug}.ts` : "",
      md: files[".md"] ? `${slug}.md` : "",
      test: files["test.ts"] ? `${slug}.test.ts` : "",
    },
    problems,
  };

  return blueprint;
}
