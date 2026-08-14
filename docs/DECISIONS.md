---

# 15. `docs/DECISIONS.md`

This is our architecture memory.

```md
# Architecture Decisions

This document records significant technical and architectural decisions.

Decisions should be added when they materially affect how the application is built or maintained.

---

## ADR-001 — Expo

### Status

Accepted

### Decision

Use Expo as the application platform.

### Reason

Expo provides the application runtime, development tooling, native APIs, build infrastructure, and EAS ecosystem required by the application.

### Consequences

The project follows Expo-compatible libraries and current Expo recommendations.

---

## ADR-002 — Expo Router

### Status

Accepted

### Decision

Use Expo Router for application navigation.

### Reason

The application is built on Expo and benefits from file-based routing, layouts, typed navigation, and deep-linking support.

### Consequences

Route definitions live under `src/app`.

---

## ADR-003 — NativeWind

### Status

Accepted

### Decision

Use NativeWind with Tailwind CSS as the primary styling system.

### Reason

The project benefits from utility-first styling, consistent design tokens, and fast component implementation.

### Consequences

NativeWind is preferred for ordinary component styling.

---

## ADR-004 — FlashList

### Status

Accepted

### Decision

Use `@shopify/flash-list` as the default collection/list implementation.

### Reason

Recipe discovery, search results, favorites, and browsing screens are collection-heavy. FlashList provides a modern performant list implementation suitable for the application's React Native architecture.

### Consequences

New dynamic collections should use FlashList unless a documented technical constraint requires another implementation.

---

## ADR-005 — TanStack Query

### Status

Accepted

### Decision

Use TanStack Query for server state.

### Reason

Recipe data is remote state requiring caching, loading state management, error handling, and controlled refetching.

### Consequences

Remote API state must not be duplicated into Zustand without a documented reason.

---

## ADR-006 — Zustand

### Status

Accepted

### Decision

Use Zustand for global client state.

### Reason

Favorites, recently viewed recipes, and persistent preferences require cross-feature access but are not server state.

### Consequences

Stores remain domain-focused.

---

## ADR-007 — AsyncStorage

### Status

Accepted

### Decision

Use AsyncStorage for persistent local application state.

### Reason

Favorites, recently viewed data, and preferences need to survive application restarts.

### Consequences

Persistence is limited to data that genuinely needs to survive restarts.

---

## ADR-008 — Zod

### Status

Accepted

### Decision

Use Zod for runtime validation of external data and application-level validation where appropriate.

### Reason

TypeScript provides compile-time safety but cannot guarantee the shape of external runtime data.

### Consequences

External API responses should be validated at the data boundary.

---

## ADR-009 — Repository Boundary

### Status

Accepted

### Decision

Use repositories between feature code and external data sources.

### Reason

This isolates TheMealDB-specific implementation and prevents external API models from leaking into the UI.

### Consequences

Feature code depends on application-facing repository operations rather than raw API calls.

---

## ADR-010 — TheMealDB

### Status

Accepted

### Decision

Use TheMealDB as the initial recipe data provider.

### Reason

It provides sufficient recipe discovery capabilities for the current product scope without requiring a custom backend.

### Consequences

The application must isolate provider-specific data structures behind the data layer.

---

## ADR-011 — Persist Local Recipe Summaries

### Status

Accepted

### Decision

Persist favorites and recently viewed recipes as ID-keyed local summaries, not full API payloads and not IDs alone.

### Reason

Lists must render after restart without fetching each recipe. Full recipe documents would duplicate TanStack Query server state. IDs alone would require a network request for every saved or recently viewed item.

### Consequences

Favorite and history records store only display fields needed by list UI: id, name, image URL, category, area, and a timestamp. Recipe details continue to load from TanStack Query.

---

## ADR-012 — Theme Preference via Appearance

### Status

Accepted

### Decision

Persist theme preference (`system` / `light` / `dark`) in `preferences-store` and apply it with React Native `Appearance.setColorScheme`.

### Reason

Existing screens and shared components already resolve colors through `useColorScheme` and NativeWind `dark:` classes. Overriding Appearance keeps a single theme system instead of a parallel color-scheme hook.

### Consequences

`system` passes `null` to `Appearance.setColorScheme` so the app follows the device. Light and dark force those schemes. Preference is applied only after persistence hydration.
