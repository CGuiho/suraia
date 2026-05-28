/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { App } from "./App";
import "./index.css";

const element = document.getElementById("root");

if (!element) {
  document.body.textContent = "Missing React application root.";
} else {
  const root = import.meta.hot
    ? ((import.meta.hot.data.root ??= createRoot(element)) as Root)
    : createRoot(element);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
