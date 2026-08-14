import { Stack, useLocalSearchParams } from "expo-router"

import { RecipeDetailsScreen } from "@/features/recipe"
import { readRouteParam } from "@/lib/route-params"

export default function RecipeDetailsRoute() {
  const params = useLocalSearchParams<{ id?: string | string[] }>()

  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: "Recipe" }} />
      <RecipeDetailsScreen recipeId={readRouteParam(params.id)} />
    </>
  )
}
