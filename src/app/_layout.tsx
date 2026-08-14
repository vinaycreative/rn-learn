import "../../global.css"

import { Stack } from "expo-router"

import { AppProviders } from "@/lib/providers"

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="recipe/[id]"
          options={{
            headerShown: false,
            title: "Recipe",
            animation: "fade_from_bottom",
          }}
        />
      </Stack>
    </AppProviders>
  )
}
