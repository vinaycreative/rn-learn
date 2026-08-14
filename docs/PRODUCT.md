# Product

## Product Name

Recipe Explorer

## Product Summary

Recipe Explorer is a mobile application for discovering, searching, exploring, and saving recipes.

Recipe data is provided by TheMealDB.

The application focuses on a fast, simple recipe-discovery experience with persistent favorites and recently viewed recipes.

---

## Primary User Journeys

### Discover

User opens the application and discovers recipes through:

- featured recipes
- popular categories
- cuisine/area collections
- random recipe discovery

### Search

User enters a recipe name and receives matching recipes.

### Browse

User explores recipes through:

- category
- cuisine/area
- ingredient where supported

### Inspect

User opens a recipe and views:

- recipe image
- name
- category
- cuisine
- ingredients
- measurements
- instructions
- available external/source links

### Save

User saves a recipe to favorites.

Favorites remain available after application restart.

### Revisit

User can access recently viewed recipes without searching again.

---

## Core Product Areas

### Home

Provides discovery-oriented content.

### Explore

Provides search and structured browsing.

### Recipe

Provides detailed recipe information.

### Favorites

Provides saved recipes.

### Settings

Provides application preferences and local-data controls.

---

## Product Principles

### Fast

The interface should respond immediately to user interaction and avoid unnecessary network requests.

### Clear

Recipe information should be easy to scan and understand.

### Consistent

Shared components and design tokens should produce consistent behavior across the application.

### Resilient

Network failures, missing images, empty results, and incomplete API data must be handled gracefully.

### Minimal

Features should remain focused on recipe discovery rather than expanding into unrelated food-management functionality.

---

## Scope

### Included

- Recipe discovery
- Recipe search
- Category browsing
- Area/cuisine browsing
- Recipe details
- Favorites
- Recently viewed recipes
- Random recipe discovery
- Local preferences
- Loading/error/empty states
- Persistent local data

### Excluded

- User accounts
- Social login
- Recipe authoring
- Payments
- Subscription system
- Grocery purchasing
- Social network features
- Server-side user profiles
- AI recipe generation
- Nutrition tracking unless supported by a future data source
