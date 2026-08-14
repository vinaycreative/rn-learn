import "../../global.css"

import { Stack } from "expo-router"

import { AppProviders } from "@/lib/providers"

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack />
    </AppProviders>
  )
}
