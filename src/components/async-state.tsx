import { Pressable, Text, View } from "react-native"

import { getUserFacingErrorMessage } from "@/lib/user-facing-error"

type ErrorStateProps = {
  error: unknown
  onRetry: () => void
  label: string
}

export function ErrorState({ error, onRetry, label }: ErrorStateProps) {
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

type EmptyStateProps = {
  message: string
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <View className="rounded-xl bg-surface px-lg py-lg dark:bg-surface-dark">
      <Text className="text-sm text-foreground-muted dark:text-foreground-muted-dark">{message}</Text>
    </View>
  )
}
