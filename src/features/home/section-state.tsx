import { isDataError } from "@/data/recipes"
import { Pressable, Text, View } from "react-native"

type SectionErrorProps = {
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

export function SectionError({ error, onRetry, label }: SectionErrorProps) {
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

type SectionEmptyProps = {
  message: string
}

export function SectionEmpty({ message }: SectionEmptyProps) {
  return (
    <View className="rounded-xl bg-surface px-lg py-lg dark:bg-surface-dark">
      <Text className="text-sm text-foreground-muted dark:text-foreground-muted-dark">{message}</Text>
    </View>
  )
}

export function FeaturedSkeleton() {
  return (
    <View
      className="h-56 w-full rounded-xl bg-surface dark:bg-surface-dark"
      accessibilityLabel="Loading featured recipe"
    />
  )
}

export function CategorySkeletonRow() {
  return (
    <View className="flex-row gap-md" accessibilityLabel="Loading categories">
      {Array.from({ length: 4 }, (_, index) => (
        <View key={index} className="h-[88px] w-[88px] rounded-xl bg-surface dark:bg-surface-dark" />
      ))}
    </View>
  )
}

export function PopularSkeletonGrid() {
  return (
    <View className="flex-row flex-wrap justify-between" accessibilityLabel="Loading popular recipes">
      {Array.from({ length: 4 }, (_, index) => (
        <View key={index} className="mb-md h-48 w-[48%] rounded-xl bg-surface dark:bg-surface-dark" />
      ))}
    </View>
  )
}
