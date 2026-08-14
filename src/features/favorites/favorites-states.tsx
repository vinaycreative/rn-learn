import { Heart } from "lucide-react-native"
import { View } from "react-native"

import { EmptyState } from "@/components/async-state"
import { Skeleton } from "@/components/ui/skeleton"

export function FavoritesEmpty() {
  return (
    <EmptyState
      icon={Heart}
      title="No favorites yet"
      message="Save recipes from details or recipe cards and they will appear here."
    />
  )
}

export function FavoritesHydrating() {
  return (
    <View className="flex-row flex-wrap justify-between" accessibilityLabel="Loading favorites">
      {Array.from({ length: 4 }, (_, index) => (
        <Skeleton key={index} className="mb-md h-56 w-[48%] rounded-3xl" />
      ))}
    </View>
  )
}
