/** @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved. */

export { createSidebar };

import type { BlueprintRecord } from "../blueprints/types";
import { CATEGORIES } from "../blueprints/categories";

function createSidebar(
  blueprints: BlueprintRecord[],
  onSelect: (slug: string) => void
): HTMLElement {
  const sidebar = document.createElement("aside");
  sidebar.className = "wb-sidebar";

  const searchBox = document.createElement("input");
  searchBox.type = "text";
  searchBox.className = "wb-sidebar-search";
  searchBox.placeholder = "Search components...";
  sidebar.appendChild(searchBox);

  const list = document.createElement("div");
  list.className = "wb-sidebar-list";
  sidebar.appendChild(list);

  const grouped = groupByCategory(blueprints);

  function renderList(filter: string): void {
    list.innerHTML = "";
    const lower = filter.toLowerCase();

    for (const category of CATEGORIES) {
      const items = grouped.get(category);
      if (!items || items.length === 0) continue;

      const filtered = items.filter(
        (bp) =>
          !lower ||
          bp.slug.toLowerCase().includes(lower) ||
          bp.name.toLowerCase().includes(lower)
      );
      if (filtered.length === 0) continue;

      const catHeader = document.createElement("div");
      catHeader.className = "wb-sidebar-category";
      catHeader.textContent = `${category} (${filtered.length})`;
      list.appendChild(catHeader);

      for (const bp of filtered) {
        const item = createSidebarItem(bp, () => onSelect(bp.slug));
        list.appendChild(item);
      }
    }
  }

  searchBox.addEventListener("input", () => {
    renderList(searchBox.value);
  });

  renderList("");

  return sidebar;
}

function groupByCategory(
  blueprints: BlueprintRecord[]
): Map<string, BlueprintRecord[]> {
  const map = new Map<string, BlueprintRecord[]>();
  for (const bp of blueprints) {
    let list = map.get(bp.category);
    if (!list) {
      list = [];
      map.set(bp.category, list);
    }
    list.push(bp);
  }
  for (const [, list] of map) {
    list.sort((a, b) => a.slug.localeCompare(b.slug));
  }
  return map;
}

function createSidebarItem(
  bp: BlueprintRecord,
  onClick: () => void
): HTMLElement {
  const item = document.createElement("div");
  item.className = "wb-sidebar-item";
  item.dataset["slug"] = bp.slug;

  const nameSpan = document.createElement("span");
  nameSpan.className = "wb-sidebar-item-name";
  nameSpan.textContent = bp.name;

  const tierSpan = document.createElement("span");
  tierSpan.className = "wb-sidebar-item-tier";
  tierSpan.textContent = `T${bp.tier}`;

  item.appendChild(nameSpan);
  item.appendChild(tierSpan);

  if (bp.problems.length > 0) {
    const warn = document.createElement("span");
    warn.className = "wb-sidebar-item-warn";
    warn.textContent = "!";
    warn.title = bp.problems.join("; ");
    item.appendChild(warn);
  }

  item.addEventListener("click", onClick);
  return item;
}
