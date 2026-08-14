import { Heart } from "lucide-react-native"
import { useEffect, useRef } from "react"
import { View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated"

import { IconButton } from "@/components/ui/button"
import { colors, iconStroke } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { springs } from "@/lib/motion"
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
  const scale = useSharedValue(1)
  const hasMounted = useRef(false)

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    scale.value = withSequence(withSpring(1.18, springs.press), withSpring(1, springs.snappy))
  }, [isFavorite, scale])

  const iconColor = variant === "overlay" ? "#FFFFFF" : isFavorite ? palette.favorite : palette.foregroundMuted
  const fill = isHydrated && isFavorite ? iconColor : "transparent"

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <View style={{ opacity: isHydrated ? 1 : 0 }} pointerEvents={isHydrated ? "auto" : "none"}>
      <IconButton
        accessibilityLabel={
          isHydrated
            ? isFavorite
              ? `Remove ${recipe.name} from favorites`
              : `Add ${recipe.name} to favorites`
            : "Loading favorite state"
        }
        selected={isHydrated ? isFavorite : undefined}
        disabled={!isHydrated}
        variant={variant === "overlay" ? "overlay" : "ghost"}
        onPress={() => {
          toggleFavorite(toSavedRecipeSummary(recipe))
        }}
      >
        <Animated.View style={animatedStyle}>
          <Heart color={iconColor} size={22} strokeWidth={iconStroke} fill={fill} />
        </Animated.View>
      </IconButton>
    </View>
  )
}
