import { FlashList, type ListRenderItem } from "@shopify/flash-list"
import { useCallback } from "react"
import { Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { RecipeCard } from "@/components/recipe-card"
import { spacing } from "@/constants/theme"
import type { RecipeSummary } from "@/data/recipes"
import { CategoryRow } from "@/features/home/category-row"
import { FeaturedRecipeCard } from "@/features/home/featured-recipe-card"
import { HomeHeader } from "@/features/home/home-header"
import {
  CategorySkeletonRow,
  FeaturedSkeleton,
  PopularSkeletonGrid,
  SectionEmpty,
  SectionError,
} from "@/features/home/section-state"
import { RecentlyViewedSection } from "@/features/home/recently-viewed-section"
import { useHomeDiscovery } from "@/features/home/use-home-discovery"

export function HomeScreen() {
  const insets = useSafeAreaInsets()
  const { featuredQuery, categoriesQuery, popularQuery, discoveryCategory } = useHomeDiscovery()

  const recipes = popularQuery.data ?? []
  const isRefreshing =
    featuredQuery.isRefetching || categoriesQuery.isRefetching || popularQuery.isRefetching

  const renderRecipe = useCallback<ListRenderItem<RecipeSummary>>(({ item }) => {
    return (
      <View className="flex-1 px-xs pb-md">
        <RecipeCard recipe={item} showFavorite />
      </View>
    )
  }, [])

  const onRefresh = useCallback(() => {
    void featuredQuery.refetch()
    void categoriesQuery.refetch()
    void popularQuery.refetch()
  }, [categoriesQuery, featuredQuery, popularQuery])

  const onShuffle = useCallback(() => {
    void featuredQuery.refetch()
  }, [featuredQuery])

  return (
    <View
      className="flex-1 bg-background dark:bg-background-dark"
      style={{ paddingTop: insets.top }}
    >
      <FlashList
        data={recipes}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipe}
        extraData={{
          featuredStatus: featuredQuery.status,
          featuredId: featuredQuery.data?.id,
          categoriesStatus: categoriesQuery.status,
          popularStatus: popularQuery.status,
          discoveryCategory,
        }}
        refreshing={isRefreshing && !featuredQuery.isPending}
        onRefresh={onRefresh}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing["2xl"],
        }}
        ListHeaderComponent={
          <View className="pb-xl">
            <HomeHeader onShuffle={onShuffle} isShuffling={featuredQuery.isFetching} />

            <Text className="mb-md mt-xl text-lg font-semibold text-foreground dark:text-foreground-dark">
              Featured
            </Text>
            {featuredQuery.isPending ? <FeaturedSkeleton /> : null}
            {featuredQuery.isError ? (
              <SectionError
                error={featuredQuery.error}
                onRetry={() => {
                  void featuredQuery.refetch()
                }}
                label="Could not load a featured recipe"
              />
            ) : null}
            {featuredQuery.isSuccess && featuredQuery.data ? (
              <FeaturedRecipeCard recipe={featuredQuery.data} />
            ) : null}
            {featuredQuery.isSuccess && !featuredQuery.data ? (
              <SectionEmpty message="No featured recipe is available right now." />
            ) : null}

            <RecentlyViewedSection />

            <Text className="mb-md mt-xl text-lg font-semibold text-foreground dark:text-foreground-dark">
              Categories
            </Text>
            {categoriesQuery.isPending ? <CategorySkeletonRow /> : null}
            {categoriesQuery.isError ? (
              <SectionError
                error={categoriesQuery.error}
                onRetry={() => {
                  void categoriesQuery.refetch()
                }}
                label="Could not load categories"
              />
            ) : null}
            {categoriesQuery.isSuccess && categoriesQuery.data.length > 0 ? (
              <CategoryRow categories={categoriesQuery.data} />
            ) : null}
            {categoriesQuery.isSuccess && categoriesQuery.data.length === 0 ? (
              <SectionEmpty message="No recipe categories are available." />
            ) : null}

            <Text className="mb-md mt-xl text-lg font-semibold text-foreground dark:text-foreground-dark">
              {discoveryCategory ? `Popular in ${discoveryCategory}` : "Popular recipes"}
            </Text>
          </View>
        }
        ListEmptyComponent={
          categoriesQuery.isPending ? (
            <PopularSkeletonGrid />
          ) : categoriesQuery.isError ? (
            <SectionEmpty message="Popular recipes will appear after categories load." />
          ) : popularQuery.isPending ? (
            <PopularSkeletonGrid />
          ) : popularQuery.isError ? (
            <SectionError
              error={popularQuery.error}
              onRetry={() => {
                void popularQuery.refetch()
              }}
              label="Could not load popular recipes"
            />
          ) : (
            <SectionEmpty message="No popular recipes are available right now." />
          )
        }
      />
    </View>
  )
}
