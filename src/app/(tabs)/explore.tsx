import { useLocalSearchParams } from "expo-router"

import { ExploreScreen } from "@/features/explore"

export default function ExploreRoute() {
  const params = useLocalSearchParams<{ category?: string | string[]; area?: string | string[] }>()

  return <ExploreScreen category={readParam(params.category)} area={readParam(params.area)} />
}

function readParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? ""
  }

  return value ?? ""
}
