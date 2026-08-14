import { EmptyState, ErrorState } from "@/components/async-state"
import { Skeleton } from "@/components/ui/skeleton"
import { View } from "react-native"

export { EmptyState as SectionEmpty, ErrorState as SectionError }

export function FeaturedSkeleton() {
  return <Skeleton className="h-72 w-full rounded-3xl" accessibilityLabel="Loading featured recipe" />
}

export function CategorySkeletonRow() {
  return (
    <View className="flex-row gap-md" accessibilityLabel="Loading categories">
      {Array.from({ length: 4 }, (_, index) => (
        <Skeleton key={index} className="h-[72px] w-[72px] rounded-full" />
      ))}
    </View>
  )
}

export function PopularSkeletonGrid() {
  return (
    <View className="flex-row flex-wrap justify-between" accessibilityLabel="Loading popular recipes">
      {Array.from({ length: 4 }, (_, index) => (
        <Skeleton key={index} className="mb-md h-56 w-[48%] rounded-3xl" />
      ))}
    </View>
  )
}
