import { EmptyState, ErrorState } from "@/components/async-state"
import { View } from "react-native"

export { EmptyState as ExploreEmpty, ErrorState as ExploreError }

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
