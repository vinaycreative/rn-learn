import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

export default function RecipeDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View className="flex-1 items-center justify-center bg-background px-lg dark:bg-background-dark">
      <Text className="text-center text-base text-foreground-muted dark:text-foreground-muted-dark">
        Recipe details are not available yet.
      </Text>
      {id ? (
        <Text className="mt-sm text-sm text-foreground-muted dark:text-foreground-muted-dark">
          Recipe ID: {id}
        </Text>
      ) : null}
    </View>
  )
}
