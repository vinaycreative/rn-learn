import { View } from "react-native"

import { AppText } from "@/components/ui/app-text"

type RecipeCardBodyProps = {
  title: string
  meta: string
  size: "grid" | "horizontal"
}

const bodyClassNames = {
  grid: "h-[76px] px-md py-sm",
  horizontal: "h-[68px] px-sm py-sm",
} as const

const titleClassNames = {
  grid: "h-[38px]",
  horizontal: "h-[34px]",
} as const

export function RecipeCardBody({ title, meta, size }: RecipeCardBodyProps) {
  return (
    <View className={bodyClassNames[size]}>
      <View className={titleClassNames[size]}>
        <AppText variant="label" numberOfLines={2}>
          {title}
        </AppText>
      </View>
      <View className="mt-xs">
        <AppText variant="caption" tone="muted" numberOfLines={1}>
          {meta || "\u00A0"}
        </AppText>
      </View>
    </View>
  )
}
