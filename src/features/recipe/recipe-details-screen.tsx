import { router } from "expo-router"
import { ArrowLeft } from "lucide-react-native"
import { Pressable, ScrollView, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { colors } from "@/constants/theme"
import { RecipeHero } from "@/features/recipe/recipe-hero"
import { RecipeIngredients } from "@/features/recipe/recipe-ingredients"
import { RecipeInstructions } from "@/features/recipe/recipe-instructions"
import { RecipeOptionalInfo } from "@/features/recipe/recipe-optional-info"
import { RecipeDetailsSkeleton, RecipeError, RecipeMissing } from "@/features/recipe/recipe-states"
import { useRecipeDetails } from "@/features/recipe/use-recipe-details"
import { useColorScheme } from "@/hooks/use-color-scheme"

type RecipeDetailsScreenProps = {
  recipeId: string
}

export function RecipeDetailsScreen({ recipeId }: RecipeDetailsScreenProps) {
  const insets = useSafeAreaInsets()
  const colorScheme = useColorScheme() ?? "light"
  const palette = colors[colorScheme]
  const { recipe, isLoading, isMissing, isError, error, refetch, isFavorite, onFavoritePress } =
    useRecipeDetails(recipeId)

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? <RecipeDetailsSkeleton /> : null}

        {isMissing && !isLoading ? (
          <View>
            <StateBackButton onPress={goBack} color={palette.foreground} topInset={insets.top} />
            <View className="px-lg">
              <RecipeMissing />
            </View>
          </View>
        ) : null}

        {isError ? (
          <View>
            <StateBackButton onPress={goBack} color={palette.foreground} topInset={insets.top} />
            <View className="px-lg">
              <RecipeError
                error={error}
                onRetry={() => {
                  void refetch()
                }}
              />
            </View>
          </View>
        ) : null}

        {recipe ? (
          <View>
            <RecipeHero
              recipe={recipe}
              isFavorite={isFavorite}
              onFavoritePress={onFavoritePress}
              onBack={goBack}
            />
            <RecipeIngredients ingredients={recipe.ingredients} />
            <RecipeInstructions instructions={recipe.instructions} />
            <RecipeOptionalInfo recipe={recipe} />
          </View>
        ) : null}
      </ScrollView>
    </View>
  )
}

function goBack() {
  if (router.canGoBack()) {
    router.back()
    return
  }

  router.replace("/")
}

function StateBackButton({
  onPress,
  color,
  topInset,
}: {
  onPress: () => void
  color: string
  topInset: number
}) {
  return (
    <View className="px-lg pb-lg" style={{ paddingTop: topInset + 8 }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={onPress}
        className="h-11 w-11 items-center justify-center rounded-full bg-surface dark:bg-surface-dark"
      >
        <ArrowLeft color={color} size={22} />
      </Pressable>
    </View>
  )
}
