# Architecture

## Architecture Goals

The architecture is designed to provide:

- clear feature ownership
- predictable data flow
- strong type safety
- minimal coupling
- replaceable external data sources
- testable business logic
- scalable feature organization
- efficient AI-assisted development

---

# Technology Architecture

## Runtime

- Expo
- React Native
- TypeScript
- React Native New Architecture

## Navigation

Expo Router

## Styling

NativeWind + Tailwind CSS

## Server State

TanStack Query

## Client State

Zustand

## Persistence

AsyncStorage

## Lists

@shopify/flash-list

## Forms

React Hook Form

## Validation

Zod

---

# Application Layers

```text
┌──────────────────────────────┐
│          Expo Router         │
│       Route / Layouts        │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        Feature Layer         │
│ UI + Feature Hooks + Logic   │
└──────────────┬───────────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
┌──────────────┐ ┌──────────────┐
│ TanStack     │ │   Zustand    │
│ Query        │ │ Client State │
└──────┬───────┘ └──────┬───────┘
       │                │
       ▼                ▼
┌────────────────────────────────┐
│        Application Data Layer  │
│ Repositories / Schemas / Maps  │
└───────────────┬────────────────┘
                │
                ▼
       ┌─────────────────┐
       │   API Client    │
       └────────┬────────┘
                │
                ▼
          TheMealDB API
```

# Client State

Domain stores live in `src/stores`.

- `favorites-store` owns saved recipes and favorite actions.
- `recently-viewed-store` owns local view history.
- `preferences-store` owns application preferences, including theme preference.

Stores persist through `src/lib/persist-storage.ts` and `src/lib/storage.ts`. Presentation components must not read or write AsyncStorage directly.
