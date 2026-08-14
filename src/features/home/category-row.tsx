import { FlashList, type ListRenderItem } from "@shopify/flash-list"
import { Link } from "expo-router"
import { useCallback } from "react"
import { Pressable, Text, View } from "react-native"

import { RecipeImage } from "@/components/recipe-image"
import type { RecipeCategory } from "@/data/recipes"

type CategoryRowProps = {
  categories: RecipeCategory[]
}

export function CategoryRow({ categories }: CategoryRowProps) {
  const renderItem = useCallback<ListRenderItem<RecipeCategory>>(({ item }) => {
    return (
      <Link href={`/explore?category=${encodeURIComponent(item.name)}`} asChild>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={`${item.name} category`}
          className="mr-md w-[88px] items-center"
        >
          <RecipeImage uri={item.imageUrl} recyclingKey={item.id} className="h-[72px] w-[72px] rounded-xl" />
          <Text
            numberOfLines={2}
            className="mt-xs min-h-[32px] text-center text-xs font-medium text-foreground dark:text-foreground-dark"
          >
            {item.name}
          </Text>
        </Pressable>
      </Link>
    )
  }, [])

  return (
    <View className="h-[120px]">
      <FlashList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  )
}
