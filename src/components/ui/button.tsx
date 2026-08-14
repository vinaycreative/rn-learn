import { type ReactNode } from "react"

import { AppText } from "@/components/ui/app-text"
import { PressableScale } from "@/components/ui/pressable-scale"
import { pressScale } from "@/lib/motion"

type ButtonVariant = "primary" | "secondary" | "destructive"

type ButtonProps = {
  label: string
  onPress: () => void
  accessibilityLabel?: string
  disabled?: boolean
  variant?: ButtonVariant
}

const variantClassNames: Record<ButtonVariant, string> = {
  primary: "bg-primary dark:bg-primary-dark",
  secondary: "bg-surface dark:bg-surface-dark",
  destructive: "bg-error dark:bg-error-dark",
}

const labelTones: Record<ButtonVariant, "onPrimary" | "default" | "inverse"> = {
  primary: "onPrimary",
  secondary: "default",
  destructive: "inverse",
}

export function Button({
  label,
  onPress,
  accessibilityLabel,
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className={`min-h-[52px] w-full items-center justify-center rounded-full px-xl ${variantClassNames[variant]} ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <AppText variant="label" tone={labelTones[variant]}>
        {label}
      </AppText>
    </PressableScale>
  )
}

type IconButtonVariant = "surface" | "overlay" | "ghost"

type IconButtonProps = {
  accessibilityLabel: string
  onPress?: () => void
  disabled?: boolean
  selected?: boolean
  busy?: boolean
  fadeWhenDisabled?: boolean
  variant?: IconButtonVariant
  children: ReactNode
}

const iconButtonClassNames: Record<IconButtonVariant, string> = {
  surface: "bg-surface-elevated dark:bg-surface-elevated-dark",
  overlay: "bg-overlay dark:bg-overlay-dark",
  ghost: "bg-transparent",
}

export function IconButton({
  accessibilityLabel,
  onPress,
  disabled = false,
  selected,
  busy = false,
  fadeWhenDisabled = true,
  variant = "surface",
  children,
}: IconButtonProps) {
  const isDisabled = disabled || busy

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isDisabled, selected, busy }}
      disabled={isDisabled}
      onPress={onPress}
      scaleTo={pressScale.iconPressed}
      className={`h-11 w-11 items-center justify-center rounded-full ${iconButtonClassNames[variant]} ${
        isDisabled && fadeWhenDisabled ? "opacity-40" : ""
      }`}
    >
      {children}
    </PressableScale>
  )
}
