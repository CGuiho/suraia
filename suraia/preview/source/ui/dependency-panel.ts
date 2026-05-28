/** @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved. */

export { createDependencyPanel };

import type { BlueprintRecord } from "../blueprints/types";

function createDependencyPanel(
  blueprint: BlueprintRecord,
  allBlueprints: BlueprintRecord[],
  onSelectDependency: (slug: string) => void
): HTMLElement {
  const panel = document.createElement("div");
  panel.className = "wb-dependency-panel";

  const heading = document.createElement("h3");
  heading.className = "wb-dependency-heading";
  heading.textContent = "Dependencies";
  panel.appendChild(heading);

  if (blueprint.dependencies.length === 0) {
    const empty = document.createElement("p");
    empty.className = "wb-dependency-empty";
    empty.textContent = "No dependencies.";
    panel.appendChild(empty);
    return panel;
  }

  const allSlugs = new Set(allBlueprints.map((b) => b.slug));

  for (const dep of blueprint.dependencies) {
    const row = document.createElement("div");
    row.className = "wb-dependency-row";

    const nameSpan = document.createElement("span");
    nameSpan.className = "wb-dependency-name";
    nameSpan.textContent = dep;

    const statusSpan = document.createElement("span");
    if (allSlugs.has(dep)) {
      statusSpan.className = "wb-dependency-status wb-dependency-exists";
      statusSpan.textContent = "exists";
      row.style.cursor = "pointer";
      row.addEventListener("click", () => onSelectDependency(dep));
    } else {
      statusSpan.className = "wb-dependency-status wb-dependency-missing";
      statusSpan.textContent = "missing";
    }

    row.appendChild(nameSpan);
    row.appendChild(statusSpan);
    panel.appendChild(row);
  }

  return panel;
}
