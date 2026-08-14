import { ArrowLeft, Heart } from "lucide-react-native"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { RecipeImage } from "@/components/recipe-image"
import { IconButton } from "@/components/ui/button"
import { iconStroke } from "@/constants/theme"
import type { Recipe } from "@/data/recipes"

type RecipeHeroProps = {
  recipe: Pick<Recipe, "id" | "imageUrl" | "name">
  isFavorite: boolean
  isFavoriteReady: boolean
  onFavoritePress?: () => void
  onBack: () => void
}

export function RecipeHero({
  recipe,
  isFavorite,
  isFavoriteReady,
  onFavoritePress,
  onBack,
}: RecipeHeroProps) {
  const insets = useSafeAreaInsets()

  return (
    <View className="relative aspect-[4/3] w-full">
      <RecipeImage
        uri={recipe.imageUrl}
        recyclingKey={recipe.id}
        variant="full"
        priority="high"
        accessibilityLabel={`${recipe.name} photo`}
        className="h-full w-full"
      />
      <View
        className="absolute inset-x-0 top-0 flex-row justify-between px-lg"
        style={{ paddingTop: insets.top + 8 }}
      >
        <IconButton accessibilityLabel="Go back" variant="overlay" onPress={onBack}>
          <ArrowLeft color="#FFFFFF" size={22} strokeWidth={iconStroke} />
        </IconButton>
        <IconButton
          accessibilityLabel={
            isFavoriteReady
              ? isFavorite
                ? "Remove from favorites"
                : "Add to favorites"
              : "Loading favorite state"
          }
          selected={isFavoriteReady ? isFavorite : undefined}
          disabled={!isFavoriteReady}
          variant="overlay"
          onPress={onFavoritePress}
        >
          <Heart
            color="#FFFFFF"
            size={22}
            strokeWidth={iconStroke}
            fill={isFavoriteReady && isFavorite ? "#FFFFFF" : "transparent"}
          />
        </IconButton>
      </View>
    </View>
  )
}
