import { Link } from "expo-router"
import { Pressable, ScrollView, Text } from "react-native"

import { RecipeImage } from "@/components/recipe-image"
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
          <Pressable
            accessibilityRole="link"
            accessibilityLabel={`${category.name} category`}
            className="mr-md w-[88px] items-center"
          >
            <RecipeImage
              uri={category.imageUrl}
              recyclingKey={category.id}
              accessibilityLabel={`${category.name} category`}
              className="h-[72px] w-[72px] rounded-xl"
            />
            <Text
              numberOfLines={2}
              className="mt-xs min-h-[32px] text-center text-xs font-medium text-foreground dark:text-foreground-dark"
            >
              {category.name}
            </Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  )
}
