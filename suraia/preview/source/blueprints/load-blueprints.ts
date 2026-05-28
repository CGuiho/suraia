/** @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved. */

export { loadAllBlueprints };

import type { BlueprintRecord } from "./types";
import { normalizeBlueprint } from "./normalize-blueprint";

function loadAllBlueprints(): BlueprintRecord[] {
  const jsonFiles = import.meta.glob<string>(
    "../../../source/components/*/*.json",
    { eager: true, query: "?raw", import: "default" }
  );
  const htmlFiles = import.meta.glob<string>(
    "../../../source/components/*/*.structure.html",
    { eager: true, query: "?raw", import: "default" }
  );
  const cssFiles = import.meta.glob<string>(
    "../../../source/components/*/*.css",
    { eager: true, query: "?raw", import: "default" }
  );
  const tsFiles = import.meta.glob<string>(
    "../../../source/components/*/*.ts",
    { eager: true, query: "?raw", import: "default" }
  );
  const mdFiles = import.meta.glob<string>(
    "../../../source/components/*/*.md",
    { eager: true, query: "?raw", import: "default" }
  );

  const bySlug = new Map<string, Record<string, string>>();

  function collect(files: Record<string, string>, suffix: string): void {
    for (const [path, content] of Object.entries(files)) {
      const parts = path.split("/");
      const dirName = parts[parts.length - 2];
      if (!dirName) continue;
      const slug = dirName;
      let entry = bySlug.get(slug);
      if (!entry) {
        entry = {};
        bySlug.set(slug, entry);
      }
      entry[suffix] = content;
    }
  }

  function collectTs(files: Record<string, string>): void {
    for (const [path, content] of Object.entries(files)) {
      const parts = path.split("/");
      const dirName = parts[parts.length - 2];
      const fileName = parts[parts.length - 1];
      if (!dirName || !fileName) continue;
      const slug = dirName;
      let entry = bySlug.get(slug);
      if (!entry) {
        entry = {};
        bySlug.set(slug, entry);
      }
      if (fileName.endsWith(".test.ts")) {
        entry["test.ts"] = content;
      } else {
        entry[".ts"] = content;
      }
    }
  }

  collect(jsonFiles, ".json");
  collect(htmlFiles, ".structure.html");
  collect(cssFiles, ".css");
  collectTs(tsFiles);
  collect(mdFiles, ".md");

  const blueprints: BlueprintRecord[] = [];
  const seen = new Set<string>();

  for (const [slug, files] of bySlug) {
    if (seen.has(slug)) continue;
    seen.add(slug);
    const blueprint = normalizeBlueprint(slug, files);
    blueprints.push(blueprint);
  }

  return blueprints;
}
