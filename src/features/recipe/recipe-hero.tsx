import { ArrowLeft, Heart } from "lucide-react-native"
import type { ReactNode } from "react"
import { Pressable, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { RecipeImage } from "@/components/recipe-image"
import type { Recipe } from "@/data/recipes"

type RecipeHeroProps = {
  recipe: Recipe
  isFavorite: boolean
  onFavoritePress?: () => void
  onBack: () => void
}

export function RecipeHero({ recipe, isFavorite, onFavoritePress, onBack }: RecipeHeroProps) {
  const insets = useSafeAreaInsets()
  const meta = [recipe.category, recipe.area].filter(Boolean).join(" · ")

  return (
    <View>
      <View className="relative h-80 w-full">
        <RecipeImage
          uri={recipe.imageUrl}
          recyclingKey={recipe.id}
          priority="high"
          accessibilityLabel={`${recipe.name} photo`}
          className="h-full w-full"
        />
        <View className="absolute inset-x-0 top-0 flex-row justify-between px-lg" style={{ paddingTop: insets.top + 8 }}>
          <HeaderIconButton accessibilityLabel="Go back" onPress={onBack}>
            <ArrowLeft color="#FFFFFF" size={22} />
          </HeaderIconButton>
          <HeaderIconButton
            accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
            accessibilityState={{ selected: isFavorite }}
            onPress={onFavoritePress}
          >
            <Heart color="#FFFFFF" size={22} fill={isFavorite ? "#FFFFFF" : "transparent"} />
          </HeaderIconButton>
        </View>
      </View>

      <View className="px-lg pt-xl">
        <Text className="text-2xl font-bold leading-tight text-foreground dark:text-foreground-dark">
          {recipe.name}
        </Text>
        {meta ? (
          <Text className="mt-sm text-base text-foreground-muted dark:text-foreground-muted-dark">{meta}</Text>
        ) : null}
      </View>
    </View>
  )
}

type HeaderIconButtonProps = {
  accessibilityLabel: string
  accessibilityState?: { selected?: boolean }
  onPress?: () => void
  children: ReactNode
}

function HeaderIconButton({
  accessibilityLabel,
  accessibilityState,
  onPress,
  children,
}: HeaderIconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      onPress={onPress}
      className="h-11 w-11 items-center justify-center rounded-full bg-black/50"
    >
      {children}
    </Pressable>
  )
}
