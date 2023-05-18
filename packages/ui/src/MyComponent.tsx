import { Button, styled, YStack } from 'tamagui'

export const SRYStack = styled(YStack, {
  name: 'SRYStack',
  variants: {} as const,
})

export const SRRoundButton = styled(Button, {
  name: 'SRRoundButton',
  acceptsClassName: true,
  color: 'white',
  fontSize: 22,
  borderRadius: '100%',
  backgroundColor: '$primary',
  borderStyle: 'solid',
  borderColor: 'white',
})
