import { Appearance } from "react-native"

import { usePreferencesStore, type ThemePreference } from "@/stores/preferences-store"

export function applyThemePreference(preference: ThemePreference) {
  Appearance.setColorScheme(preference === "system" ? null : preference)
}

function syncThemePreference() {
  const { isHydrated, themePreference } = usePreferencesStore.getState()

  if (!isHydrated) {
    return
  }

  applyThemePreference(themePreference)
}

let unsubscribeThemePreference: (() => void) | undefined

export function subscribeThemePreference() {
  unsubscribeThemePreference?.()
  syncThemePreference()
  unsubscribeThemePreference = usePreferencesStore.subscribe(syncThemePreference)
  return unsubscribeThemePreference
}
