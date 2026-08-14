import { Stack, useLocalSearchParams } from "expo-router"

import { RecipeDetailsScreen } from "@/features/recipe"

export default function RecipeDetailsRoute() {
  const params = useLocalSearchParams<{ id?: string | string[] }>()

  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: "Recipe" }} />
      <RecipeDetailsScreen recipeId={readParam(params.id)} />
    </>
  )
}

function readParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? ""
  }

  return value ?? ""
}
