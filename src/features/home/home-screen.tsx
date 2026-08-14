import { FlashList, type ListRenderItem } from "@shopify/flash-list"
import { useCallback, useMemo } from "react"
import { View } from "react-native"
import { useBottomTabBarLayout } from "@/components/bottom-tab-bar"
import { RecipeCard } from "@/components/recipe-card"
import { SectionHeader, SECTION_GAP_CLASS, LIST_HEADER_PADDING_CLASS } from "@/components/ui/section-header"
import { spacing } from "@/constants/theme"
import type { RecipeSummary } from "@/data/recipes"
import { CategoryRow } from "@/features/home/category-row"
import { FeaturedRecipeCard } from "@/components/featured-recipe-card"
import { HomeHeader } from "@/features/home/home-header"
import { RecentlyViewedSection } from "@/features/home/recently-viewed-section"
import {
  CategorySkeletonRow,
  FeaturedSkeleton,
  PopularSkeletonGrid,
  SectionEmpty,
  SectionError,
} from "@/features/home/section-state"
import { useHomeDiscovery } from "@/features/home/use-home-discovery"

const EXCLUDED_HOME_CATEGORIES = new Set(["beef", "chicken"])

export function HomeScreen() {
  const { topInset, contentPaddingBottom } = useBottomTabBarLayout()
  const { featuredQuery, categoriesQuery, popularQuery, discoveryCategory } = useHomeDiscovery()

  const recipes = popularQuery.data ?? []
  const homeCategories = useMemo(
    () =>
      (categoriesQuery.data ?? []).filter(
        (category) => !EXCLUDED_HOME_CATEGORIES.has(category.name.trim().toLowerCase()),
      ),
    [categoriesQuery.data],
  )
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
      style={{ paddingTop: topInset }}
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
          paddingBottom: contentPaddingBottom,
        }}
        ListHeaderComponent={
          <View className={LIST_HEADER_PADDING_CLASS}>
            <HomeHeader onShuffle={onShuffle} isShuffling={featuredQuery.isFetching} />

            <View className={SECTION_GAP_CLASS}>
              <SectionHeader title="Featured" />
            </View>
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

            <View className={SECTION_GAP_CLASS}>
              <SectionHeader title="Categories" />
            </View>
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
            {categoriesQuery.isSuccess && homeCategories.length > 0 ? (
              <CategoryRow categories={homeCategories} />
            ) : null}
            {categoriesQuery.isSuccess && homeCategories.length === 0 ? (
              <SectionEmpty message="No recipe categories are available." />
            ) : null}

            <View className={SECTION_GAP_CLASS}>
              <SectionHeader
                title={discoveryCategory ? `Popular in ${discoveryCategory}` : "Trending now"}
              />
            </View>
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
