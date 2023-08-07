import { ToastViewport as ToastViewportOg } from '@my/ui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Dimensions } from 'react-native'

const { height: screenHeight } = Dimensions.get('window')

export const ToastViewport = () => {
  const { right, left } = useSafeAreaInsets()
  return <ToastViewportOg top={(screenHeight - 120) / 2} left={left} right={right} />
}
