import { Toast, useToastState } from '@tamagui/toast'
import { YStack } from 'tamagui'
import { Dimensions } from 'react-native'

const { height: screenHeight } = Dimensions.get('window')

export const CustomToast = () => {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) {
    return null
  }

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      enterStyle={{ opacity: 0, scale: 0.5 }}
      exitStyle={{ opacity: 0, scale: 1 }}
      y={(screenHeight - 120) / 2}
      opacity={1}
      scale={1}
      animation="quick"
    >
      <YStack
        backgroundColor="rgba(0,0,0,0.7)"
        borderRadius="$4"
        paddingVertical="$1.5"
        paddingHorizontal="$2.5"
        alignItems="center"
        justifyContent="center"
        maxWidth="$18"
      >
        <Toast.Title color="white" textAlign="center">
          {currentToast.title}
        </Toast.Title>
        {!!currentToast.message && (
          <Toast.Description color="white" textAlign="center">
            {currentToast.message}
          </Toast.Description>
        )}
      </YStack>
    </Toast>
  )
}
