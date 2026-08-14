import { FlashList, type ListRenderItem } from "@shopify/flash-list"
import { Search } from "lucide-react-native"
import { memo, useCallback, useMemo } from "react"
import { KeyboardAvoidingView, Platform, View } from "react-native"
import { useBottomTabBarLayout } from "@/components/bottom-tab-bar"
import { RecipeCard } from "@/components/recipe-card"
import { SearchInput } from "@/components/search-input"
import { ScreenHeader, SectionHeader, SECTION_GAP_CLASS, LIST_HEADER_PADDING_CLASS } from "@/components/ui/section-header"
import { spacing } from "@/constants/theme"
import type { RecipeSummary } from "@/data/recipes"
import { ExploreEmpty, ExploreError, FilterChipsSkeleton, RecipeResultsSkeleton } from "@/features/explore/explore-states"
import { FilterChipRow } from "@/features/explore/filter-chip-row"
import { useExplore, type ExploreMode } from "@/features/explore/use-explore"

type FilterChipOption = {
  id: string
  label: string
}

type ExploreFiltersHeaderProps = {
  mode: ExploreMode
  selectedCategory: string
  selectedArea: string
  resultsTitle: string
  categoryChips: FilterChipOption[]
  areaChips: FilterChipOption[]
  categoriesPending: boolean
  categoriesErrored: boolean
  categoriesError: unknown
  categoriesSucceeded: boolean
  areasPending: boolean
  areasErrored: boolean
  areasError: unknown
  areasSucceeded: boolean
  onRetryCategories: () => void
  onRetryAreas: () => void
  onSelectCategory: (name: string) => void
  onSelectArea: (name: string) => void
  onClearBrowse: () => void
}

const ExploreFiltersHeader = memo(function ExploreFiltersHeader({
  mode,
  selectedCategory,
  selectedArea,
  resultsTitle,
  categoryChips,
  areaChips,
  categoriesPending,
  categoriesErrored,
  categoriesError,
  categoriesSucceeded,
  areasPending,
  areasErrored,
  areasError,
  areasSucceeded,
  onRetryCategories,
  onRetryAreas,
  onSelectCategory,
  onSelectArea,
  onClearBrowse,
}: ExploreFiltersHeaderProps) {
  const showBrowseFilters = mode !== "search"

  return (
    <View className={LIST_HEADER_PADDING_CLASS}>
      {showBrowseFilters ? (
        <>
          <View className={SECTION_GAP_CLASS}>
            <SectionHeader title="Categories" />
            {categoriesPending ? <FilterChipsSkeleton label="Loading categories" /> : null}
            {categoriesErrored ? (
              <ExploreError error={categoriesError} onRetry={onRetryCategories} label="Could not load categories" />
            ) : null}
            {categoriesSucceeded && categoryChips.length > 0 ? (
              <FilterChipRow
                chips={categoryChips}
                selectedId={selectedCategory}
                onSelect={onSelectCategory}
                accessibilityLabel="Recipe categories"
              />
            ) : null}
            {categoriesSucceeded && categoryChips.length === 0 ? (
              <ExploreEmpty message="No recipe categories are available." />
            ) : null}
          </View>

          <View className={SECTION_GAP_CLASS}>
            <SectionHeader title="Cuisines" />
            {areasPending ? <FilterChipsSkeleton label="Loading cuisines" /> : null}
            {areasErrored ? (
              <ExploreError error={areasError} onRetry={onRetryAreas} label="Could not load cuisines" />
            ) : null}
            {areasSucceeded && areaChips.length > 0 ? (
              <FilterChipRow
                chips={areaChips}
                selectedId={selectedArea}
                onSelect={onSelectArea}
                accessibilityLabel="Recipe cuisines"
              />
            ) : null}
            {areasSucceeded && areaChips.length === 0 ? (
              <ExploreEmpty message="No recipe cuisines are available." />
            ) : null}
          </View>
        </>
      ) : null}

      {mode !== "browse" ? (
        <View className={showBrowseFilters ? SECTION_GAP_CLASS : "mt-lg"}>
          <SectionHeader
            title={resultsTitle}
            actionLabel={mode === "category" || mode === "area" ? "Clear" : undefined}
            actionAccessibilityLabel="Clear filter"
            onActionPress={mode === "category" || mode === "area" ? onClearBrowse : undefined}
          />
        </View>
      ) : null}
    </View>
  )
})

type ExploreScreenProps = {
  category: string
  area: string
}

export function ExploreScreen({ category, area }: ExploreScreenProps) {
  const { topInset, contentPaddingBottom } = useBottomTabBarLayout()
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
        <RecipeCard recipe={item} showFavorite />
      </View>
    )
  }, [])

  const onRefresh = useCallback(() => {
    void categoriesQuery.refetch()
    void areasQuery.refetch()
    void resultsQuery?.refetch()
  }, [areasQuery, categoriesQuery, resultsQuery])

  const onRetryCategories = useCallback(() => {
    void categoriesQuery.refetch()
  }, [categoriesQuery])

  const onRetryAreas = useCallback(() => {
    void areasQuery.refetch()
  }, [areasQuery])

  const onRetryResults = useCallback(() => {
    void resultsQuery?.refetch()
  }, [resultsQuery])

  const listHeader = useMemo(
    () => (
      <ExploreFiltersHeader
        mode={mode}
        selectedCategory={selectedCategory}
        selectedArea={selectedArea}
        resultsTitle={resultsTitle}
        categoryChips={categoryChips}
        areaChips={areaChips}
        categoriesPending={categoriesQuery.isPending}
        categoriesErrored={categoriesQuery.isError}
        categoriesError={categoriesQuery.error}
        categoriesSucceeded={categoriesQuery.isSuccess}
        areasPending={areasQuery.isPending}
        areasErrored={areasQuery.isError}
        areasError={areasQuery.error}
        areasSucceeded={areasQuery.isSuccess}
        onRetryCategories={onRetryCategories}
        onRetryAreas={onRetryAreas}
        onSelectCategory={selectCategory}
        onSelectArea={selectArea}
        onClearBrowse={clearBrowse}
      />
    ),
    [
      areaChips,
      areasQuery.error,
      areasQuery.isError,
      areasQuery.isPending,
      areasQuery.isSuccess,
      categoriesQuery.error,
      categoriesQuery.isError,
      categoriesQuery.isPending,
      categoriesQuery.isSuccess,
      categoryChips,
      clearBrowse,
      mode,
      onRetryAreas,
      onRetryCategories,
      resultsTitle,
      selectArea,
      selectCategory,
      selectedArea,
      selectedCategory,
    ],
  )

  const listEmpty = useMemo(() => {
    if (mode === "browse") {
      return (
        <ExploreEmpty
          icon={Search}
          title="Start exploring"
          message="Search by name or choose a category or cuisine to get started."
        />
      )
    }

    if (isResultsLoading) {
      return <RecipeResultsSkeleton />
    }

    if (resultsQuery?.isError) {
      return <ExploreError error={resultsQuery.error} onRetry={onRetryResults} label={errorLabel} />
    }

    return <ExploreEmpty title="No recipes found" message={emptyMessage} />
  }, [emptyMessage, errorLabel, isResultsLoading, mode, onRetryResults, resultsQuery?.error, resultsQuery?.isError])

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background dark:bg-background-dark"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ paddingTop: topInset }}
    >
      <View style={{ paddingHorizontal: spacing.lg }}>
        <ScreenHeader title="Explore" subtitle="Search by name, or browse by category and cuisine" />
        <View className="mt-lg">
          <SearchInput
            value={searchInput}
            onChangeText={setSearchInput}
            onSubmit={submitSearch}
            onClear={clearSearch}
          />
        </View>
      </View>

      <FlashList
        style={{ flex: 1 }}
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
          paddingBottom: contentPaddingBottom,
        }}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={listEmpty}
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
