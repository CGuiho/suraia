---
title: Create and host design token JSON Schema
lane: todo
created: 2026-05-20T02:09:00Z
updated: 2026-05-20T02:09:00Z
description: Create the JSON Schema file for design tokens on the repository, and host or reference it using a valid public URL (e.g., GitHub raw URL).
---

## Conversation

### user

https://suraia.guiho.co/schemas/tokens.json does not exist
create on the repo
add a task to host this file and provide the valid url or juqst use gothub url, the repo is public

### agent

I have added this task to the board. We will:
1. Create a `schemas/tokens.json` file containing the JSON Schema definition for our design tokens format.
2. Update the `$schema` reference in `suraia/source/themes/tokens.json` to point to the raw GitHub URL of this schema.
