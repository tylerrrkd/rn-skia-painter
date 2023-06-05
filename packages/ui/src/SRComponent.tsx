import { Button, styled, YStack } from 'tamagui'
import { Stack } from 'expo-router'
import { commonColors } from './theme/tokens'

export const SRScreen: React.FC<React.ComponentProps<typeof Stack.Screen>> = (props) => (
  <Stack.Screen
    {...props}
    options={{
      headerTintColor: 'black',
      headerShadowVisible: false,
      contentStyle: {
        borderTopColor: commonColors.primary,
        borderTopWidth: 1,
      },
      ...props.options,
    }}
  />
)

export const SRYStack = styled(YStack, {
  name: 'SRYStack',
  variants: {} as const,
})

export const SRButton = styled(Button, {
  name: 'SRButton',
  acceptsClassName: true,
  color: 'white',
  backgroundColor: '$primary',
  borderWidth: 0,
  pressStyle: {
    opacity: 0.6,
    backgroundColor: '$primary',
  },
})

export const SRRoundButton = styled(SRButton, {
  name: 'SRRoundButton',
  acceptsClassName: true,
  fontSize: 22,
  borderRadius: '100%',
})

export const SRIconButton = styled(SRButton, {
  name: 'SRIconButton',
  acceptsClassName: true,
  color: '$primary',
  borderStyle: 'solid',
  borderColor: '$primary',
  backgroundColor: '',
  p: '$0',
  pressStyle: {
    opacity: 0.6,
    borderColor: '$primary',
    backgroundColor: '',
  },
})
