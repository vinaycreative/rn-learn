import { useLocalSearchParams } from "expo-router"

import { ExploreScreen } from "@/features/explore"
import { readRouteParam } from "@/lib/route-params"

export default function ExploreRoute() {
  const params = useLocalSearchParams<{ category?: string | string[]; area?: string | string[] }>()

  return <ExploreScreen category={readRouteParam(params.category)} area={readRouteParam(params.area)} />
}
