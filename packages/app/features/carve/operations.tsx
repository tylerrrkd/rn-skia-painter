import React, { useMemo } from 'react'
import { TranslationKey, useTranslation } from '@my/locales'
import { GetProps, SRIconButton, SpaceTokens, XStack, YStack } from '@my/ui'
import { Contrast, Droplet, Lasso, Palette, Square, MenuSquare, Undo2 } from '@tamagui/lucide-icons'
import {
  ActionButton,
  ActionButtonProps,
  ActionSlider,
  actionButtonHeight,
  actionSliderHeight,
} from './actions'

const defaultStackSpace: SpaceTokens = '$4'

type ActionStackProps = GetProps<typeof XStack>
type ActionProps = Omit<ActionButtonProps, 'children'> & { name: TranslationKey }
// 辅助动作区
export const ActionStack: React.FC<ActionStackProps> = (props) => {
  const { t } = useTranslation()
  const actions = useMemo(() => {
    const pathEffectStack: ActionProps[] = [
      { name: 'solid', type: 's', icon: <MenuSquare /> },
      { name: 'hollow', type: 's', icon: <Square /> },
    ]
    const colorFilterStack: ActionProps[] = [
      { name: 'b/w', type: 's', icon: <Contrast /> },
      { name: 'grayscale', type: 's', icon: <Droplet /> },
      { name: 'outline', type: 's', icon: <Lasso /> },
      { name: 'true tone', type: 's', icon: <Palette /> },
    ]
    return true ? pathEffectStack : colorFilterStack
  }, [])

  return (
    <XStack
      minHeight={String(actionButtonHeight)}
      space={defaultStackSpace}
      justifyContent="center"
      {...props}
    >
      {actions.map(({ name, ...action }) => (
        <ActionButton key={name} {...action}>
          {t(name)}
        </ActionButton>
      ))}
    </XStack>
  )
}

type SliderStackProps = GetProps<typeof YStack>
// 辅助动作区
export const SliderStack: React.FC<SliderStackProps> = (props) => {
  const { t } = useTranslation()

  return (
    <YStack minHeight={String(actionSliderHeight)} {...props}>
      {true ? (
        <ActionSlider
          name={t('brush size')}
          extra={<SRIconButton icon={<Undo2 color="black" size="$1.5" />} />}
        />
      ) : (
        <ActionSlider name={t('contrast ratio')} />
      )}
    </YStack>
  )
}
