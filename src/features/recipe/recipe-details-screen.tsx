import { router } from "expo-router"
import { ArrowLeft } from "lucide-react-native"
import { ScrollView, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { IconButton } from "@/components/ui/button"
import { colors, iconStroke, spacing } from "@/constants/theme"
import { RecipeContent } from "@/features/recipe/recipe-content"
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
  const {
    recipe,
    isLoading,
    isMissing,
    isError,
    error,
    refetch,
    isFavorite,
    isFavoriteReady,
    onFavoritePress,
  } = useRecipeDetails(recipeId)

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      {isLoading ? (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: insets.bottom + spacing["3xl"] }}
          showsVerticalScrollIndicator={false}
        >
          <RecipeDetailsSkeleton />
          <View className="absolute left-0 px-lg" style={{ top: insets.top + 8 }}>
            <IconButton accessibilityLabel="Go back" onPress={goBack}>
              <ArrowLeft color={palette.foreground} size={22} strokeWidth={iconStroke} />
            </IconButton>
          </View>
        </ScrollView>
      ) : null}

      {isMissing && !isLoading ? (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: insets.bottom + spacing["3xl"] }}
        >
          <StateBackButton onPress={goBack} color={palette.foreground} topInset={insets.top} />
          <View className="px-xl">
            <RecipeMissing />
          </View>
        </ScrollView>
      ) : null}

      {isError ? (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: insets.bottom + spacing["3xl"] }}
        >
          <StateBackButton onPress={goBack} color={palette.foreground} topInset={insets.top} />
          <View className="px-xl">
            <RecipeError
              error={error}
              onRetry={() => {
                void refetch()
              }}
            />
          </View>
        </ScrollView>
      ) : null}

      {recipe ? (
        <RecipeContent
          recipe={recipe}
          isFavorite={isFavorite}
          isFavoriteReady={isFavoriteReady}
          onFavoritePress={onFavoritePress}
          onBack={goBack}
        />
      ) : null}
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
      <IconButton accessibilityLabel="Go back" onPress={onPress}>
        <ArrowLeft color={color} size={22} strokeWidth={iconStroke} />
      </IconButton>
    </View>
  )
}
