import { Pressable, type PressableProps } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

import { pressScale, springs } from "@/lib/motion"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type PressableScaleProps = PressableProps & {
  scaleTo?: number
}

export function PressableScale({
  children,
  style,
  scaleTo = pressScale.pressed,
  onPressIn,
  onPressOut,
  ...props
}: PressableScaleProps) {
  const scale = useSharedValue<number>(pressScale.rest)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <AnimatedPressable
      {...props}
      style={[style, animatedStyle]}
      onPressIn={(event) => {
        scale.value = withSpring(scaleTo, springs.press)
        onPressIn?.(event)
      }}
      onPressOut={(event) => {
        scale.value = withSpring(pressScale.rest, springs.press)
        onPressOut?.(event)
      }}
    >
      {children}
    </AnimatedPressable>
  )
}
