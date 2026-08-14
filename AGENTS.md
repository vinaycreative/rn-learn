# AGENTS.md

## Repository Instructions

This repository contains a production-oriented React Native application.

All changes must follow the repository architecture, coding standards, design system, data conventions, and testing requirements documented in this repository.

---

## Before Making Changes

Before modifying code:

1. Inspect the existing repository structure.
2. Read the relevant project documentation.
3. Read applicable `.cursor/rules`.
4. Inspect existing implementations for similar functionality.
5. Reuse established patterns before creating new abstractions.
6. Identify the smallest safe change required.

Do not make architectural assumptions when the repository already contains an established pattern.

---

## Source of Truth

Use the following priority when resolving ambiguity:

1. Existing working source code
2. Explicit user requirements
3. `docs/REQUIREMENTS.md`
4. `docs/ARCHITECTURE.md`
5. `docs/DESIGN.md`
6. `docs/DATA.md`
7. `docs/DECISIONS.md`
8. `.cursor/rules/`
9. Framework and library documentation / installed skills

When an existing implementation conflicts with documentation, inspect the conflict before changing either one.

---

## Change Scope

- Keep changes focused on the requested task.
- Do not refactor unrelated code.
- Do not rename files or modules without a reason.
- Do not introduce duplicate abstractions.
- Do not introduce a new dependency when an existing dependency already solves the problem.
- Do not replace an established library or architectural pattern without an explicit reason.
- Preserve existing behavior outside the requested change.

---

## Dependencies

Before adding a dependency:

1. Check whether the required capability already exists.
2. Check whether an installed dependency already provides the capability.
3. Verify Expo and React Native compatibility.
4. Prefer maintained, well-supported libraries.
5. Consider bundle size and native requirements.
6. Document significant architectural dependency decisions in `docs/DECISIONS.md`.

---

## UI

Follow:

- `.cursor/rules/ui.mdc`
- `docs/DESIGN.md`

NativeWind is the primary styling system.

Use the application's design tokens instead of arbitrary styling values.

---

## Data

Follow:

- `.cursor/rules/data.mdc`
- `.cursor/rules/state.mdc`
- `docs/DATA.md`
- `docs/ARCHITECTURE.md`

Server state must use TanStack Query.

External API responses must not leak directly into presentation components.

---

## Lists

`@shopify/flash-list` is the default collection/list implementation.

Do not introduce `FlatList` for new application lists unless there is a documented technical reason.

---

## Validation

After implementation:

1. Run TypeScript checks.
2. Run linting.
3. Run relevant tests.
4. Inspect the final diff.
5. Verify affected screens and states.
6. Confirm no unrelated files were changed.

Do not claim validation was completed unless it was actually performed.

---

## Documentation

Update documentation when implementation changes affect:

- product requirements
- architecture
- API/data contracts
- design behavior
- important technical decisions
- development workflow
- project status

Keep documentation concise and factual.
Do not add educational commentary to production documentation.
