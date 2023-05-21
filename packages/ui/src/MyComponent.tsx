import { Button, styled, YStack } from 'tamagui'

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
