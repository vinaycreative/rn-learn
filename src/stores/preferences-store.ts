import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { zustandAsyncStorage } from "@/lib/persist-storage"
import { storageKeys } from "@/lib/storage-keys"

export const THEME_PREFERENCES = ["system", "light", "dark"] as const

export type ThemePreference = (typeof THEME_PREFERENCES)[number]

type PreferencesState = {
  themePreference: ThemePreference
  isHydrated: boolean
  setThemePreference: (themePreference: ThemePreference) => void
}

type PersistedPreferencesState = Pick<PreferencesState, "themePreference">

function isThemePreference(value: unknown): value is ThemePreference {
  return THEME_PREFERENCES.some((preference) => preference === value)
}

function normalizePreferencesState(value: unknown): PersistedPreferencesState {
  if (!value || typeof value !== "object") {
    return { themePreference: "system" }
  }

  const candidate = value as Partial<PersistedPreferencesState>

  return {
    themePreference: isThemePreference(candidate.themePreference)
      ? candidate.themePreference
      : "system",
  }
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      themePreference: "system",
      isHydrated: false,
      setThemePreference: (themePreference) => {
        if (!isThemePreference(themePreference)) {
          return
        }

        set({ themePreference })
      },
    }),
    {
      name: storageKeys.preferences,
      storage: createJSONStorage(() => zustandAsyncStorage),
      partialize: (state) => ({
        themePreference: state.themePreference,
      }),
      merge: (persisted, current) => ({
        ...current,
        ...normalizePreferencesState(persisted),
      }),
      onRehydrateStorage: () => () => {
        usePreferencesStore.setState({ isHydrated: true })
      },
    },
  ),
)

function markPreferencesHydrated() {
  usePreferencesStore.setState({ isHydrated: true })
}

if (usePreferencesStore.persist.hasHydrated()) {
  markPreferencesHydrated()
}

usePreferencesStore.persist.onFinishHydration(markPreferencesHydrated)
