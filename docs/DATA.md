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

---

# Boundary Responsibilities

## API Client

`src/data/themealdb/client.ts` is the only module that talks to TheMealDB.

- Base URL is centralized in `src/data/themealdb/config.ts`.
- Network and HTTP failures are normalized to `DataError`.
- Request cancellation uses `AbortSignal` from TanStack Query.

## Validation

External payloads are validated with Zod schemas in `src/data/themealdb/schemas.ts`.

Invalid payloads become `DataError` with code `validation`.

## Repository

`recipeRepository` is the application-facing data API.

Feature code must not import TheMealDB client, schemas, or response types.

## Application Models

UI and feature hooks consume:

- `Recipe`
- `RecipeSummary`
- `RecipeIngredient`
- `RecipeCategory`
- `RecipeArea`

These models are independent of TheMealDB field names.

---

# TheMealDB Endpoints

Base URL:

`https://www.themealdb.com/api/json/v1/1/`

| Operation | Endpoint |
| --- | --- |
| Search by name | `search.php?s=` |
| Get by ID | `lookup.php?i=` |
| Random recipe | `random.php` |
| Categories | `categories.php` |
| Areas | `list.php?a=list` |
| Recipes by category | `filter.php?c=` |
| Recipes by area | `filter.php?a=` |

TheMealDB returns `{ meals: null }` when a list endpoint has no matches. The repository treats that as an empty array for search and filter operations.

Lookup-by-ID with no meal is `not_found`.
Random with no meal is `empty`.

---

# Ingredient Transformation

TheMealDB stores up to 20 numbered pairs:

- `strIngredient1` … `strIngredient20`
- `strMeasure1` … `strMeasure20`

The mapper converts those fields into `Recipe.ingredients: { name, measure }[]`.

Empty or whitespace-only ingredient names are omitted.

---

# Query Keys

All recipe query keys live in `src/data/query-keys.ts`.

Use `queryKeys.recipes` or `recipeQueryKeys`. Do not invent parallel key formats for the same resource.

---

# Errors

`DataError` codes:

- `network` — fetch failed before a usable HTTP response
- `api` — non-OK HTTP status or unreadable JSON
- `validation` — payload failed Zod validation
- `not_found` — lookup returned no recipe
- `empty` — an endpoint that should return a recipe returned none

UI should branch on `DataError.code` rather than HTTP status codes.

---

# Query Hooks

Shared TanStack Query hooks live in `src/data/recipes/hooks.ts`:

- `useSearchRecipes`
- `useRecipeById`
- `useRandomRecipe`
- `useRecipeCategories`
- `useRecipeAreas`
- `useRecipesByCategory`
- `useRecipesByArea`

Search, detail, category, and area hooks stay disabled until their required argument is non-empty.

---

# Client Persistence

Favorites and recently viewed recipes are client state. They are stored by recipe ID and a small display summary so lists can render without additional API requests.

Persisted summaries include:

- recipe ID
- name
- image URL
- category
- area
- saved or viewed timestamp

They do not store full recipe payloads, ingredients, or instructions.

Persistence keys:

- `recipe-explorer.favorites`
- `recipe-explorer.recently-viewed`

Storage goes through `src/lib/storage.ts`. Zustand persist adapters must not call AsyncStorage directly.

Malformed persisted JSON is discarded and treated as empty state.

Recently viewed history is capped at 20 recipes. Opening an already-recorded recipe updates its timestamp and moves it to the front.
