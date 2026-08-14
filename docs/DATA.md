---

# 13. `docs/DATA.md`

This one should be particularly detailed because Recipe Explorer is API-driven.

```md
# Data Architecture

## Data Source

Primary recipe data source:

TheMealDB

The external API is treated as an untrusted boundary.

The application must not couple UI components directly to TheMealDB response formats.

---

# Data Flow

```text
TheMealDB
    ↓
API Client
    ↓
Zod Validation
    ↓
Repository
    ↓
Transformation
    ↓
Application Models
    ↓
TanStack Query
    ↓
Features
```
