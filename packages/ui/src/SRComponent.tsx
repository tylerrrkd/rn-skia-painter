import { Button, styled, YStack } from 'tamagui'
import { Stack } from 'expo-router'

export const SRScreen: React.FC<React.ComponentProps<typeof Stack.Screen>> = (props) => (
  <Stack.Screen
    {...props}
    options={{
      headerTintColor: "black",
      headerShadowVisible: false,
      contentStyle: {
        borderTopColor: '#F78F21',
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
  pressStyle: {
    borderColor: '$colorTransparent',
    backgroundColor: '$primaryPressBackground',
  },
})

export const SRRoundButton = styled(SRButton, {
  name: 'SRRoundButton',
  acceptsClassName: true,
  fontSize: 22,
  borderRadius: '100%',
})
