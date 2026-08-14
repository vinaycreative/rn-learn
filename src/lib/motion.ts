import { FadeIn, FadeInDown, FadeOut, LinearTransition, ZoomIn } from "react-native-reanimated"

export const springs = {
  press: {
    damping: 18,
    stiffness: 320,
    mass: 0.35,
  },
  snappy: {
    damping: 20,
    stiffness: 280,
    mass: 0.45,
  },
  gentle: {
    damping: 24,
    stiffness: 180,
    mass: 0.7,
  },
} as const

export const pressScale = {
  rest: 1,
  pressed: 0.97,
  iconPressed: 0.9,
} as const

export const motion = {
  fadeIn: FadeIn.duration(180),
  fadeOut: FadeOut.duration(160),
  enter: FadeInDown.duration(220).springify().damping(22).stiffness(220),
  pop: ZoomIn.duration(180).springify().damping(16).stiffness(280),
  layout: LinearTransition.springify().damping(22).stiffness(240),
} as const
