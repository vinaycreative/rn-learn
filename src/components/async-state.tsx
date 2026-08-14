import { type LucideIcon } from "lucide-react-native"
import { View } from "react-native"

import { AppText } from "@/components/ui/app-text"
import { Button } from "@/components/ui/button"
import { colors, iconStroke } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { getUserFacingErrorMessage } from "@/lib/user-facing-error"

type EmptyStateProps = {
  title?: string
  message: string
  icon?: LucideIcon
}

export function EmptyState({ title, message, icon: Icon }: EmptyStateProps) {
  const colorScheme = useColorScheme() ?? "light"
  const palette = colors[colorScheme]

  return (
    <View className="items-center rounded-3xl bg-surface px-xl py-2xl dark:bg-surface-dark">
      {Icon ? (
        <View className="h-14 w-14 items-center justify-center rounded-full bg-surface-elevated dark:bg-surface-elevated-dark">
          <Icon color={palette.primary} size={24} strokeWidth={iconStroke} />
        </View>
      ) : null}
      {title ? (
        <AppText variant="title" className={`text-center ${Icon ? "mt-lg" : ""}`}>
          {title}
        </AppText>
      ) : null}
      <AppText variant="body" tone="muted" className={`text-center ${title || Icon ? "mt-sm" : ""}`}>
        {message}
      </AppText>
    </View>
  )
}

type ErrorStateProps = {
  error: unknown
  onRetry: () => void
  label: string
}

export function ErrorState({ error, onRetry, label }: ErrorStateProps) {
  return (
    <View className="rounded-3xl bg-surface px-xl py-xl dark:bg-surface-dark">
      <AppText variant="label" tone="error">
        {label}
      </AppText>
      <AppText variant="body" tone="muted" className="mt-sm">
        {getUserFacingErrorMessage(error)}
      </AppText>
      <View className="mt-lg self-start">
        <Button label="Retry" onPress={onRetry} />
      </View>
    </View>
  )
}
