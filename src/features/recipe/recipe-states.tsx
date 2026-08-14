import { Pressable, Text, View } from "react-native"

import { isDataError } from "@/data/recipes"

type RecipeErrorProps = {
  error: unknown
  onRetry: () => void
}

export function getUserFacingErrorMessage(error: unknown): string {
  if (isDataError(error)) {
    return error.message
  }

  return "Something went wrong. Please try again."
}

export function RecipeError({ error, onRetry }: RecipeErrorProps) {
  return (
    <View className="items-start rounded-xl bg-surface px-lg py-lg dark:bg-surface-dark">
      <Text className="text-sm font-medium text-error dark:text-error-dark">Could not load this recipe</Text>
      <Text className="mt-xs text-sm text-foreground-muted dark:text-foreground-muted-dark">
        {getUserFacingErrorMessage(error)}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Retry"
        onPress={onRetry}
        className="mt-md min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-primary px-lg dark:bg-primary-dark"
      >
        <Text className="text-sm font-semibold text-primary-foreground dark:text-primary-foreground-dark">
          Retry
        </Text>
      </Pressable>
    </View>
  )
}

export function RecipeMissing() {
  return (
    <View className="rounded-xl bg-surface px-lg py-lg dark:bg-surface-dark">
      <Text className="text-base font-semibold text-foreground dark:text-foreground-dark">
        Recipe not found
      </Text>
      <Text className="mt-xs text-sm text-foreground-muted dark:text-foreground-muted-dark">
        This recipe is unavailable or no longer exists.
      </Text>
    </View>
  )
}

export function RecipeDetailsSkeleton() {
  return (
    <View accessibilityLabel="Loading recipe">
      <View className="h-80 w-full bg-surface dark:bg-surface-dark" />
      <View className="px-lg pt-xl">
        <View className="h-8 w-3/4 rounded-md bg-surface dark:bg-surface-dark" />
        <View className="mt-md h-4 w-1/2 rounded-md bg-surface dark:bg-surface-dark" />
        <View className="mt-xl h-5 w-32 rounded-md bg-surface dark:bg-surface-dark" />
        <View className="mt-md h-16 w-full rounded-xl bg-surface dark:bg-surface-dark" />
        <View className="mt-sm h-16 w-full rounded-xl bg-surface dark:bg-surface-dark" />
        <View className="mt-xl h-5 w-40 rounded-md bg-surface dark:bg-surface-dark" />
        <View className="mt-md h-40 w-full rounded-xl bg-surface dark:bg-surface-dark" />
      </View>
    </View>
  )
}
