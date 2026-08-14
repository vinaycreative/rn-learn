import { QueryClientProvider } from "@tanstack/react-query"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { type ReactNode, useEffect, useState } from "react"

import { subscribeThemePreference } from "@/lib/apply-theme-preference"
import { appFontMap } from "@/lib/fonts"
import { createQueryClient } from "@/lib/query-client"
import "@/stores/favorites-store"
import "@/stores/preferences-store"
import "@/stores/recently-viewed-store"

SplashScreen.preventAutoHideAsync().catch(() => {
  // Splash screen may already be hidden during fast refresh.
})

subscribeThemePreference()

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(createQueryClient)
  const [fontsLoaded, fontError] = useFonts(appFontMap)

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {
        // Splash screen may already be hidden.
      })
    }
  }, [fontError, fontsLoaded])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
