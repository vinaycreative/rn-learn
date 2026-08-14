import { AppText } from "@/components/ui/app-text"
import { View } from "react-native"

const QUANTITY_COLUMN_WIDTH = 88

type IngredientRowProps = {
  measure: string
  name: string
}

export function IngredientRow({ measure, name }: IngredientRowProps) {
  const quantity = measure.trim()

  return (
    <View className="min-h-[48px] flex-row items-start gap-md py-sm">
      <View
        className="shrink-0 items-center justify-center rounded-full bg-primary-soft px-sm py-xs dark:bg-primary-soft-dark"
        style={{ width: QUANTITY_COLUMN_WIDTH, minHeight: 32 }}
      >
        {quantity ? (
          <AppText variant="caption" tone="primary" className="text-center">
            {quantity}
          </AppText>
        ) : (
          <View accessibilityElementsHidden importantForAccessibility="no" className="h-4 w-full" />
        )}
      </View>
      <AppText variant="body" className="min-w-0 flex-1 pt-0.5">
        {name}
      </AppText>
    </View>
  )
}
