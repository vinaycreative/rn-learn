## Current Design Direction

The current UI implementation follows the redesign specification in:

`docs/REDESIGN.md`

Visual reference:

`docs/ui-reference.png`

`REDESIGN.md` is the source of truth for the current visual redesign.

---

## Design Tokens

All visual constants are centralized in:

- `src/constants/theme.tokens.js` — canonical token values
- `src/constants/theme.ts` — typed exports and typography presets
- `tailwind.config.js` — NativeWind/Tailwind mirror of the same tokens

### Colors

| Token | Light | Usage |
| --- | --- | --- |
| `background` | `#F8F8F3` | Warm off-white screen background |
| `surface` | `#E6EEDC` | Soft sage secondary surfaces |
| `surfaceElevated` | `#FFFFFF` | White cards and inputs |
| `foreground` | `#20251D` | Near-black primary text |
| `foregroundMuted` | `#6F756B` | Muted gray-green secondary text |
| `primary` | `#304C24` | Deep forest green actions and accents |
| `error` | `#B42318` | Destructive actions |

### Typography

Primary UI font: **Plus Jakarta Sans**

Editorial headings (`AppText` `display` variant): **Playfair Display**

| Role | Size | Variant |
| --- | --- | --- |
| Screen title | 34px | `display` |
| Section title | 26px | `title` |
| Card title | 18px | `subtitle` |
| Body | 16px | `body` |
| Metadata | 14px | `caption` |
| Button | 16px medium | `label` |

Use `AppText` variants instead of one-off font sizes.

### Spacing

4px-based scale: `xs` (4), `sm` (8), `md` (12), `lg` (16), `xl` (24), `2xl` (32), `3xl` (48).

### Radius

Semantic radii include `card` (24px) and `full` for pills.

### Icons

Sizes: `xs` 16, `sm` 20, `md` 22, `lg` 24, `xl` 28. Stroke width: `1.75`.

### Component Heights

`sm` 44, `md` 52, `lg` 56, `tab` 48, `tabBar` 64. Tailwind classes: `min-h-component-md`, etc.

### Shadows

`shadows.sm`, `shadows.md`, `shadows.lg` in `theme.ts` for raised surfaces.
