import { FlashList, type ListRenderItem } from "@shopify/flash-list"
import { Compass } from "lucide-react-native"
import { useCallback, useMemo } from "react"
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { RecipeCard } from "@/components/recipe-card"
import { colors, spacing } from "@/constants/theme"
import type { RecipeSummary } from "@/data/recipes"
import { ExploreEmpty, ExploreError, FilterChipsSkeleton, RecipeResultsSkeleton } from "@/features/explore/explore-states"
import { FilterChipRow } from "@/features/explore/filter-chip-row"
import { SearchField } from "@/features/explore/search-field"
import { useExplore, type ExploreMode } from "@/features/explore/use-explore"
import { useColorScheme } from "@/hooks/use-color-scheme"

type ExploreScreenProps = {
  category: string
  area: string
}

export function ExploreScreen({ category, area }: ExploreScreenProps) {
  const insets = useSafeAreaInsets()
  const colorScheme = useColorScheme() ?? "light"
  const palette = colors[colorScheme]
  const {
    searchInput,
    setSearchInput,
    submitSearch,
    clearSearch,
    mode,
    selectedCategory,
    selectedArea,
    selectCategory,
    selectArea,
    clearBrowse,
    categoriesQuery,
    areasQuery,
    resultsQuery,
    isSearchPending,
  } = useExplore({ category, area })

  const recipes = resultsQuery?.data ?? []
  const categoryChips = useMemo(
    () => (categoriesQuery.data ?? []).map((item) => ({ id: item.name, label: item.name })),
    [categoriesQuery.data],
  )
  const areaChips = useMemo(() => {
    const seenNames = new Set<string>()

    return (areasQuery.data ?? []).flatMap((item) => {
      if (seenNames.has(item.name)) {
        return []
      }

      seenNames.add(item.name)
      return [{ id: item.name, label: item.name }]
    })
  }, [areasQuery.data])

  const resultsTitle = getResultsTitle(mode, selectedCategory, selectedArea, searchInput)
  const emptyMessage = getEmptyMessage(mode, selectedCategory, selectedArea, searchInput)
  const errorLabel = getErrorLabel(mode)
  const isResultsLoading = Boolean(resultsQuery?.isPending) || isSearchPending
  const isRefreshing = Boolean(resultsQuery?.isRefetching)

  const renderRecipe = useCallback<ListRenderItem<RecipeSummary>>(({ item }) => {
    return (
      <View className="flex-1 px-xs pb-md">
        <RecipeCard recipe={item} />
      </View>
    )
  }, [])

  const onRefresh = useCallback(() => {
    void categoriesQuery.refetch()
    void areasQuery.refetch()
    void resultsQuery?.refetch()
  }, [areasQuery, categoriesQuery, resultsQuery])

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background dark:bg-background-dark"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ paddingTop: insets.top }}
    >
      <FlashList
        data={mode === "browse" ? [] : recipes}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipe}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        extraData={{
          mode,
          selectedCategory,
          selectedArea,
          resultsStatus: resultsQuery?.status,
          isSearchPending,
        }}
        refreshing={isRefreshing && !isResultsLoading}
        onRefresh={mode === "browse" ? undefined : onRefresh}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing["2xl"],
        }}
        ListHeaderComponent={
          <View className="pb-xl">
            <View className="min-h-[44px] flex-row items-center">
              <View className="h-11 w-11 items-center justify-center rounded-xl bg-primary dark:bg-primary-dark">
                <Compass color={palette.primaryForeground} size={22} />
              </View>
              <View className="ml-md flex-1">
                <Text className="text-xl font-bold text-foreground dark:text-foreground-dark">Explore</Text>
                <Text className="text-sm text-foreground-muted dark:text-foreground-muted-dark">
                  Search or browse recipes
                </Text>
              </View>
            </View>

            <View className="mt-xl">
              <SearchField
                value={searchInput}
                onChangeText={setSearchInput}
                onSubmit={submitSearch}
                onClear={clearSearch}
              />
            </View>

            <Text className="mb-md mt-xl text-lg font-semibold text-foreground dark:text-foreground-dark">
              Categories
            </Text>
            {categoriesQuery.isPending ? <FilterChipsSkeleton label="Loading categories" /> : null}
            {categoriesQuery.isError ? (
              <ExploreError
                error={categoriesQuery.error}
                onRetry={() => {
                  void categoriesQuery.refetch()
                }}
                label="Could not load categories"
              />
            ) : null}
            {categoriesQuery.isSuccess && categoryChips.length > 0 ? (
              <FilterChipRow
                chips={categoryChips}
                selectedId={selectedCategory}
                onSelect={selectCategory}
                accessibilityLabel="Recipe categories"
              />
            ) : null}
            {categoriesQuery.isSuccess && categoryChips.length === 0 ? (
              <ExploreEmpty message="No recipe categories are available." />
            ) : null}

            <Text className="mb-md mt-xl text-lg font-semibold text-foreground dark:text-foreground-dark">
              Cuisines
            </Text>
            {areasQuery.isPending ? <FilterChipsSkeleton label="Loading cuisines" /> : null}
            {areasQuery.isError ? (
              <ExploreError
                error={areasQuery.error}
                onRetry={() => {
                  void areasQuery.refetch()
                }}
                label="Could not load cuisines"
              />
            ) : null}
            {areasQuery.isSuccess && areaChips.length > 0 ? (
              <FilterChipRow
                chips={areaChips}
                selectedId={selectedArea}
                onSelect={selectArea}
                accessibilityLabel="Recipe cuisines"
              />
            ) : null}
            {areasQuery.isSuccess && areaChips.length === 0 ? (
              <ExploreEmpty message="No recipe cuisines are available." />
            ) : null}

            {mode !== "browse" ? (
              <View className="mt-xl flex-row items-center justify-between">
                <Text className="flex-1 text-lg font-semibold text-foreground dark:text-foreground-dark">
                  {resultsTitle}
                </Text>
                {mode === "category" || mode === "area" ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Clear filter"
                    onPress={clearBrowse}
                    className="min-h-[44px] items-center justify-center px-sm"
                  >
                    <Text className="text-sm font-medium text-primary dark:text-primary-dark">Clear</Text>
                  </Pressable>
                ) : null}
              </View>
            ) : null}
          </View>
        }
        ListEmptyComponent={
          mode === "browse" ? (
            <ExploreEmpty message="Search by name or choose a category or cuisine to get started." />
          ) : isResultsLoading ? (
            <RecipeResultsSkeleton />
          ) : resultsQuery?.isError ? (
            <ExploreError
              error={resultsQuery.error}
              onRetry={() => {
                void resultsQuery.refetch()
              }}
              label={errorLabel}
            />
          ) : (
            <ExploreEmpty message={emptyMessage} />
          )
        }
      />
    </KeyboardAvoidingView>
  )
}

function getResultsTitle(mode: ExploreMode, category: string, area: string, searchInput: string): string {
  if (mode === "search") {
    return `Results for “${searchInput.trim()}”`
  }

  if (mode === "category") {
    return category
  }

  if (mode === "area") {
    return `${area} cuisine`
  }

  return "Recipes"
}

function getEmptyMessage(mode: ExploreMode, category: string, area: string, searchInput: string): string {
  if (mode === "search") {
    return `No recipes match “${searchInput.trim()}”.`
  }

  if (mode === "category") {
    return `No recipes found in ${category}.`
  }

  if (mode === "area") {
    return `No recipes found for ${area} cuisine.`
  }

  return "Search by name or choose a category or cuisine to get started."
}

function getErrorLabel(mode: ExploreMode): string {
  if (mode === "search") {
    return "Could not search recipes"
  }

  if (mode === "category") {
    return "Could not load category recipes"
  }

  if (mode === "area") {
    return "Could not load cuisine recipes"
  }

  return "Could not load recipes"
}
