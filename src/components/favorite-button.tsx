import { Heart } from "lucide-react-native"
import { Pressable } from "react-native"

import { colors } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { selectIsFavorite, useFavoritesStore } from "@/stores/favorites-store"
import { toSavedRecipeSummary, type SavedRecipeInput } from "@/stores/saved-recipe"

type FavoriteButtonProps = {
  recipe: SavedRecipeInput
  variant?: "overlay" | "plain"
}

export function FavoriteButton({ recipe, variant = "plain" }: FavoriteButtonProps) {
  const colorScheme = useColorScheme() ?? "light"
  const palette = colors[colorScheme]
  const isHydrated = useFavoritesStore((state) => state.isHydrated)
  const isFavorite = useFavoritesStore(selectIsFavorite(recipe.id))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  const iconColor = variant === "overlay" ? "#FFFFFF" : palette.primary

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        isHydrated
          ? isFavorite
            ? `Remove ${recipe.name} from favorites`
            : `Add ${recipe.name} to favorites`
          : "Loading favorite state"
      }
      accessibilityState={isHydrated ? { selected: isFavorite } : undefined}
      disabled={!isHydrated}
      hitSlop={8}
      onPress={() => {
        toggleFavorite(toSavedRecipeSummary(recipe))
      }}
      className={
        variant === "overlay"
          ? "h-11 w-11 items-center justify-center rounded-full bg-black/50"
          : "h-11 w-11 items-center justify-center"
      }
      style={{ opacity: isHydrated ? 1 : 0 }}
    >
      <Heart color={iconColor} size={22} fill={isHydrated && isFavorite ? iconColor : "transparent"} />
    </Pressable>
  )
}
