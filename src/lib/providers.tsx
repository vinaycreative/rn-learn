import { QueryClientProvider } from "@tanstack/react-query"
import { type ReactNode, useState } from "react"

import { createQueryClient } from "@/lib/query-client"
import "@/stores/favorites-store"
import "@/stores/recently-viewed-store"

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(createQueryClient)

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
