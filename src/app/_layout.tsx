import "../../global.css"

import { Stack } from "expo-router"

import { AppProviders } from "@/lib/providers"

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="recipe/[id]" options={{ headerShown: false, title: "Recipe" }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
      </Stack>
    </AppProviders>
  )
}
