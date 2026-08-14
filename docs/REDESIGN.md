# Recipe Explorer — UI Redesign

## Goal

Redesign the existing Recipe Explorer UI to match the provided visual reference.

The target is a clean, premium, modern recipe app with:

- Warm neutral backgrounds
- Olive green accent color
- Large food photography
- Clean typography
- Generous spacing
- Rounded surfaces
- Minimal borders
- Subtle depth
- Simple line icons
- Strong visual hierarchy

The UI should feel calm, polished and intentional — not like a default Expo application.

## Visual Direction

Use the provided `ui-reference.png` as the primary visual reference.

Prioritize:

- Food imagery
- Clean layouts
- White elevated surfaces
- Olive/neutral palette
- Consistent spacing
- Editorial typography
- Simple controls
- Minimal decoration

Avoid:

- Excessive gradients
- Heavy shadows
- Excessive pills
- Excessive borders
- Bright/random colors
- Crowded layouts
- Unnecessary decorative elements

## Screens

### Home

Create a strong discovery experience:

- Greeting
- Search
- Featured recipe
- Categories
- Popular/trending recipes
- Recipe collections

The featured recipe should be the visual focus.

### Explore

Focus on:

- Search
- Filters
- Categories
- Cuisines/areas
- Recipe results

Keep the screen clean and easy to scan.

### Recipe Details

Use an image-led layout:

- Large hero image
- Recipe title
- Metadata
- Description
- Ingredients
- Instructions
- Primary action

### Favorites

Use the same recipe-card language as Home and Explore.

Keep the screen simple and curated.

### Settings

Use simple grouped sections:

- Appearance
- Data
- About

## Bottom Navigation

Replace the current default-looking tab bar with a modern floating navigation bar.

Destinations:

- Home
- Explore
- Favorites
- Settings

Use:

- Rounded elevated surface
- Olive active state
- Lucide icons
- Clear active/inactive states
- Safe-area support

Keep Expo Router.

## Motion

Motion should improve usability, not decorate the application.

Use animation only for:

- Navigation state
- Favorite toggle
- Button press feedback
- Important UI state changes
- Necessary screen transitions

Animations must feel immediate.

Preferred duration:

`150–220ms`

Use Reanimated.

Avoid:

- Slow transitions
- Bouncing
- Excessive spring physics
- Animating every card
- Animating every section
- Large screen-wide effects
- JS timer-based animations

## Design System

Continue using:

- NativeWind
- Tailwind
- Lucide React Native
- Reanimated
- expo-image
- FlashList

Create reusable components where appropriate.

Do not introduce another UI library.

## Colors

Primary:

`#304C24`

Primary Soft:

`#E6EEDC`

Background:

`#F8F8F3`

Surface:

`#FFFFFF`

Primary Text:

`#20251D`

Secondary Text:

`#6F756B`

Use semantic theme tokens rather than scattering colors throughout components.

## Constraints

This redesign must NOT change:

- Product functionality
- TheMealDB integration
- TanStack Query architecture
- Zustand architecture
- Expo Router
- FlashList
- NativeWind
- Expo 54

Do not add another UI library or animation library.

The redesign is strictly a **visual, UX and interaction improvement**.
