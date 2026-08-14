# Development Guide

## Prerequisites

Required:

- Node.js 20 or later
- npm
- Git
- Expo tooling
- iOS Simulator or Android Emulator for local native development

Recommended:

- Cursor
- Xcode for iOS development
- Android Studio for Android development
- An Expo account for EAS cloud builds
- EAS CLI (`npx eas-cli` or a global `eas-cli` install)

---

# Installation

Install project dependencies:

```bash
npm install
```

# Validation

```bash
npm run typecheck
npm run lint
npm test
npx expo-doctor
npx expo config --type public
```

GitHub Actions runs the same install, TypeScript, lint, test, and Expo Doctor checks on `main` and pull requests. See `.github/workflows/validate.yml`.

# Environment configuration

The app does not require committed environment files.

- TheMealDB is public and centralized in `src/data/themealdb/config.ts`.
- Do not add TheMealDB URLs or keys to `app.json`, EAS env, or `.env` files.
- Do not commit secrets. `.gitignore` excludes `.env`, `.env.*`, `credentials.json`, `google-service-account.json`, and common signing artifacts.
- If a future secret is needed, keep it out of the repository and inject it through EAS Secrets or a local untracked `.env`. Public values may use `EXPO_PUBLIC_*` only when they are safe to ship in the client.

# Application metadata

Configured in `app.json`:

| Field | Value |
| --- | --- |
| Name | Recipe Explorer |
| Slug | `recipe-explorer` |
| Version | `1.0.0` |
| iOS bundle identifier | `com.recipeexplorer.app` |
| Android package | `com.recipeexplorer.app` |
| URL scheme | `recipeexplorer` |
| Release platforms | iOS, Android |

Web remains available for local `expo start --web` only. There is no production web host or Expo project ID in this repository.

Versioning stays local and manual. Do not bump `version` unless a release requires it.

# EAS profiles

`eas.json` defines three build profiles. Version numbers come from `app.json` (`cli.appVersionSource` is `local`). Profiles do not auto-increment versions and do not create or store credentials.

| Profile | Purpose |
| --- | --- |
| `development` | Development client (`expo-dev-client`), internal distribution |
| `preview` | Internal release-like build; Android APK |
| `production` | Store-signed binary for App Store / Play upload when credentials exist |

Store submission is not configured. Do not add Apple, Google, or Expo credentials to the repository.

# Build commands

Initialize the Expo/EAS project once (creates a real `projectId`; do not invent one):

```bash
npx eas-cli login
npx eas-cli init
```

Development client:

```bash
npx eas-cli build --profile development --platform ios
npx eas-cli build --profile development --platform android
npx expo start --dev-client
```

Preview:

```bash
npx eas-cli build --profile preview --platform ios
npx eas-cli build --profile preview --platform android
```

Production (does not submit to stores):

```bash
npx eas-cli build --profile production --platform ios
npx eas-cli build --profile production --platform android
```

Local native builds require Xcode or Android Studio and signing setup:

```bash
npx eas-cli build --profile development --platform ios --local
npx eas-cli build --profile development --platform android --local
```

Do not run `eas submit` until store accounts and credentials are configured outside this repository.
