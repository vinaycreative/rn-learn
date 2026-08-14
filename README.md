# Recipe Explorer

A modern React Native recipe discovery application powered by TheMealDB.

## Features

- Recipe discovery
- Recipe search
- Category browsing
- Cuisine/area browsing
- Recipe details
- Favorites
- Recently viewed recipes
- Random recipe discovery
- Persistent local preferences

## Stack

- Expo
- React Native
- TypeScript
- Expo Router
- NativeWind
- Tailwind CSS
- FlashList
- TanStack Query
- Zustand
- AsyncStorage
- React Hook Form
- Zod
- TheMealDB
- EAS

## Architecture

The application uses a feature-oriented architecture with:

- Expo Router for navigation
- TanStack Query for server state
- Zustand for client state
- Repository boundaries for external data
- Zod for runtime validation
- NativeWind for styling
- FlashList for dynamic collections

## Project Structure

```text
src/
├── app/
├── components/
├── features/
├── data/
├── stores/
├── hooks/
├── lib/
├── constants/
└── types/
```
