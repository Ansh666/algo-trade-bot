---
name: PostgreSQL numeric responses
description: API serialization behavior for Drizzle/PostgreSQL numeric columns in this workspace
---

PostgreSQL `numeric` columns returned by Drizzle are strings by default, while generated API schemas commonly expect JSON numbers.

**Why:** Strict response validation fails at runtime even when TypeScript typechecks if database rows are passed directly to generated Zod schemas.

**How to apply:** Normalize numeric fields at the API boundary before response-schema parsing, and preserve `Date` instances while recursively normalizing nested objects.