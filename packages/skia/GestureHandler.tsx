import type { SkMatrix, SkRect } from '@shopify/react-native-skia'
import { Skia } from '@shopify/react-native-skia'
import React, { useMemo, useEffect } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  cancelAnimation,
} from 'react-native-reanimated'

import { rotateZ, toM4, translate, scale } from './MatrixHelpers'

interface GestureHandlerProps {
  matrix: SkMatrix
  dimensions: SkRect
  debug?: boolean
  onSelect?: () => void
  onMatrixChange?: (matrix: SkMatrix) => void
}

export const GestureHandler = ({
  matrix,
  dimensions,
  debug,
  onSelect,
  onMatrixChange,
}: GestureHandlerProps) => {
  const { x, y, width, height } = dimensions
  const origin = useSharedValue(Skia.Point(0, 0))
  const offset = useSharedValue(Skia.Matrix())

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => onSelect?.())
    .onChange((e) => {
      onMatrixChange?.(translate(matrix, e.changeX, e.changeY))
    })
    .onEnd(() => onSelect?.())

  const rotate = Gesture.Rotation()
    .runOnJS(true)
    .onBegin((e) => {
      origin.value = Skia.Point(e.anchorX, e.anchorY)
      offset.value = matrix
    })
    .onChange((e) => {
      onMatrixChange?.(rotateZ(offset.value, e.rotation, origin.value))
    })
    .onEnd(() => onSelect?.())

  const pinch = Gesture.Pinch()
    .runOnJS(true)
    .onBegin((e) => {
      origin.value = Skia.Point(e.focalX, e.focalY)
      offset.value = matrix
    })
    .onChange((e) => {
      onMatrixChange?.(scale(offset.value, e.scale, origin.value))
    })
    .onEnd(() => onSelect?.())

  const m4Matrix = useMemo(() => toM4(matrix), [matrix])

  const style = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      backgroundColor: debug ? 'rgba(100, 200, 300, 0.2)' : 'transparent',
      transform: [
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        {
          matrix: m4Matrix,
        },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ],
    }
  }, [matrix])

  // When unmounting the component we need to cancel animations if any
  useEffect(() => {
    return () => {
      cancelAnimation(offset)
    }
  })

  const gesture = Gesture.Race(pinch, rotate, pan)

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={style} />
    </GestureDetector>
  )
}
