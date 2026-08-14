---

# 14. `docs/DESIGN.md`

This is our actual UI/UX source of truth.

```md
# Design System

## Design Direction

Recipe Explorer uses a clean, modern, content-focused mobile interface.

The design prioritizes:

- recipe imagery
- readable information hierarchy
- fast scanning
- simple navigation
- clear actions
- minimal visual noise

---

# Design Principles

## Content First

Recipe imagery and recipe information are the primary visual elements.

## Clear Hierarchy

Users should immediately understand:

1. what content they are viewing
2. what action is available
3. what information is most important

## Consistency

Repeated patterns must use shared components and design tokens.

## Feedback

Every asynchronous or interactive operation should communicate its state.

---

# Styling

NativeWind is the primary styling system.

Tailwind utility classes should be used for standard layout and visual styling.

React Native `StyleSheet` may be used when:

- a third-party library requires it
- dynamic styles are clearer
- an API does not support NativeWind
- there is a measured performance reason

---

# Design Tokens

Tokens should be centralized rather than repeated throughout components.

Token categories:

- colors
- typography
- spacing
- radius
- shadows
- animation durations

The implementation source of truth for tokens should live in the application's theme configuration.

---

# Color System

The application should define semantic colors rather than hard-coded component colors.

Example semantic roles:

```text
background
surface
surfaceElevated
foreground
foregroundMuted
primary
primaryForeground
border
success
warning
error
```
