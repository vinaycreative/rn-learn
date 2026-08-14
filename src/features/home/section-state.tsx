import { EmptyState, ErrorState } from "@/components/async-state"
import { View } from "react-native"

export { EmptyState as SectionEmpty, ErrorState as SectionError }

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
