import { type ReactNode } from "react"
import { View, type ViewProps } from "react-native"

import { shadows } from "@/constants/theme"

type SurfaceElevation = "flat" | "raised"

export const SURFACE_BORDER_CLASS = "border border-border dark:border-border-dark"

type SurfaceProps = ViewProps & {
  elevation?: SurfaceElevation
  children?: ReactNode
}

export function Surface({ elevation = "flat", className, style, children, ...props }: SurfaceProps) {
  return (
    <View
      {...props}
      style={elevation === "raised" ? [shadows.sm, style] : style}
      className={`overflow-hidden rounded-2xl bg-surface-elevated dark:bg-surface-elevated-dark ${SURFACE_BORDER_CLASS} ${className ?? ""}`}
    >
      {children}
    </View>
  )
}
