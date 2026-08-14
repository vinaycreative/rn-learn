import { Link } from "expo-router"
import { ScrollView, View } from "react-native"

import { RecipeImage } from "@/components/recipe-image"
import { AppText } from "@/components/ui/app-text"
import { PressableScale } from "@/components/ui/pressable-scale"
import { spacing } from "@/constants/theme"
import type { RecipeCategory } from "@/data/recipes"

type CategoryRowProps = {
  categories: RecipeCategory[]
}

export function CategoryRow({ categories }: CategoryRowProps) {
  return (
    <ScrollView
      horizontal
      accessibilityLabel="Recipe categories"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: spacing.lg }}
    >
      {categories.map((category) => (
        <Link key={category.id} href={`/explore?category=${encodeURIComponent(category.name)}`} asChild>
          <PressableScale
            accessibilityRole="link"
            accessibilityLabel={`${category.name} category`}
            className="mr-lg w-[88px] items-center"
          >
            <View className="h-[72px] w-[72px] overflow-hidden rounded-full">
              <RecipeImage
                uri={category.imageUrl}
                recyclingKey={category.id}
                variant="preview"
                accessibilityLabel={`${category.name} category`}
                className="h-full w-full"
              />
            </View>
            <AppText variant="caption" numberOfLines={2} className="mt-sm text-center">
              {category.name}
            </AppText>
          </PressableScale>
        </Link>
      ))}
    </ScrollView>
  )
}
