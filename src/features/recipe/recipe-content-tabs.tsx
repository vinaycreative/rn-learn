import { AppText } from "@/components/ui/app-text"
import { PressableScale } from "@/components/ui/pressable-scale"
import { View } from "react-native"

export type RecipeContentTab = "ingredients" | "instructions"

type RecipeContentTabsProps = {
  activeTab: RecipeContentTab
  onTabChange: (tab: RecipeContentTab) => void
}

const TABS: { id: RecipeContentTab; label: string }[] = [
  { id: "ingredients", label: "Ingredients" },
  { id: "instructions", label: "Instructions" },
]

export function RecipeContentTabs({ activeTab, onTabChange }: RecipeContentTabsProps) {
  return (
    <View
      accessibilityRole="tablist"
      className="flex-row border-b border-border dark:border-border-dark"
    >
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab

        return (
          <PressableScale
            key={tab.id}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isActive }}
            onPress={() => onTabChange(tab.id)}
            className="mr-xl min-h-[44px] justify-center pb-md"
          >
            <AppText variant="label" tone={isActive ? "primary" : "muted"}>
              {tab.label}
            </AppText>
            {isActive ? (
              <View className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary dark:bg-primary-dark" />
            ) : null}
          </PressableScale>
        )
      })}
    </View>
  )
}
