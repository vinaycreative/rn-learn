import { Pressable, Text, View } from "react-native"

import { isDataError } from "@/data/recipes"

type ExploreErrorProps = {
  error: unknown
  onRetry: () => void
  label: string
}

export function getUserFacingErrorMessage(error: unknown): string {
  if (isDataError(error)) {
    return error.message
  }

  return "Something went wrong. Please try again."
}

export function ExploreError({ error, onRetry, label }: ExploreErrorProps) {
  return (
    <View className="items-start rounded-xl bg-surface px-lg py-lg dark:bg-surface-dark">
      <Text className="text-sm font-medium text-error dark:text-error-dark">{label}</Text>
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

type ExploreEmptyProps = {
  message: string
}

export function ExploreEmpty({ message }: ExploreEmptyProps) {
  return (
    <View className="rounded-xl bg-surface px-lg py-lg dark:bg-surface-dark">
      <Text className="text-sm text-foreground-muted dark:text-foreground-muted-dark">{message}</Text>
    </View>
  )
}

export function RecipeResultsSkeleton() {
  return (
    <View className="flex-row flex-wrap justify-between" accessibilityLabel="Loading recipes">
      {Array.from({ length: 4 }, (_, index) => (
        <View key={index} className="mb-md h-48 w-[48%] rounded-xl bg-surface dark:bg-surface-dark" />
      ))}
    </View>
  )
}

export function FilterChipsSkeleton({ label }: { label: string }) {
  return (
    <View className="flex-row gap-sm" accessibilityLabel={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <View key={index} className="h-11 w-24 rounded-full bg-surface dark:bg-surface-dark" />
      ))}
    </View>
  )
}
