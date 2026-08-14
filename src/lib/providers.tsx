import { QueryClientProvider } from "@tanstack/react-query"
import { type ReactNode, useState } from "react"

import { subscribeThemePreference } from "@/lib/apply-theme-preference"
import { createQueryClient } from "@/lib/query-client"
import "@/stores/favorites-store"
import "@/stores/preferences-store"
import "@/stores/recently-viewed-store"

subscribeThemePreference()

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(createQueryClient)

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
