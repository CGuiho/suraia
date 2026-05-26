/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { serve } from "bun";
import index from "../index.html";

const port = Number(process.env["PORT"] ?? 4101);

const server = serve({
  port,
  routes: {
    "/*": index,
    "/api/blueprints": {
      GET() {
        return Response.json({
          package: "@guiho/suraia",
          target: "vanilla",
          mode: "generated-local-code",
          components: 111,
        });
      },
    },
  },
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`Suraia Vanilla example running at ${server.url}`);
