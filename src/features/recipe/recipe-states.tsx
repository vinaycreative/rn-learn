import { ErrorState } from "@/components/async-state"
import { AppText } from "@/components/ui/app-text"
import { Skeleton } from "@/components/ui/skeleton"
import { View } from "react-native"

type RecipeErrorProps = {
  error: unknown
  onRetry: () => void
}

export function RecipeError({ error, onRetry }: RecipeErrorProps) {
  return <ErrorState error={error} onRetry={onRetry} label="Could not load this recipe" />
}

export function RecipeMissing() {
  return (
    <View className="rounded-3xl bg-surface px-xl py-xl dark:bg-surface-dark">
      <AppText variant="title">Recipe not found</AppText>
      <AppText variant="body" tone="muted" className="mt-sm">
        This recipe is unavailable or no longer exists.
      </AppText>
    </View>
  )
}

export function RecipeDetailsSkeleton() {
  return (
    <View accessibilityLabel="Loading recipe">
      <Skeleton className="aspect-[4/3] w-full" />
      <View className="-mt-8 rounded-t-3xl bg-background px-xl pb-lg pt-xl dark:bg-background-dark">
        <Skeleton className="h-10 w-3/4 rounded-md" />
        <Skeleton className="mt-sm h-4 w-1/3 rounded-md" />
      </View>
      <View className="px-xl pt-lg">
        <Skeleton className="h-11 w-full rounded-md" />
      </View>
      <View className="gap-sm px-xl pt-md">
        <Skeleton className="h-12 w-full rounded-2xl" />
        <Skeleton className="h-12 w-full rounded-2xl" />
        <Skeleton className="h-12 w-full rounded-2xl" />
        <Skeleton className="h-12 w-full rounded-2xl" />
      </View>
    </View>
  )
}
