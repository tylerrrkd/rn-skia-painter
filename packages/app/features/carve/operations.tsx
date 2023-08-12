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
import { LayerType } from '@my/stores'

const defaultStackSpace: SpaceTokens = '$4'

export type PathEffectType = 'solid' | 'hollow'

export type ShaderType = 'b/w' | 'grayscale' | 'outline' | 'true tone'

const pathEffectStack: ActionProps<PathEffectType>[] = [
  { name: 'solid', type: 's', icon: <MenuSquare /> },
  { name: 'hollow', type: 's', icon: <Square /> },
]
const shaderStack: ActionProps<ShaderType>[] = [
  { name: 'b/w', type: 's', icon: <Contrast /> },
  { name: 'grayscale', type: 's', icon: <Droplet /> },
  { name: 'outline', type: 's', icon: <Lasso /> },
  { name: 'true tone', type: 's', icon: <Palette /> },
]

type ActionStackProps = GetProps<typeof XStack> & {
  layerType?: LayerType
  onAction?: (actionName: any) => void
}
type ActionProps<T> = Omit<ActionButtonProps, 'children'> & { name: T }
// 辅助动作区
export const ActionStack: React.FC<ActionStackProps> = ({ layerType, onAction, ...props }) => {
  const { t } = useTranslation()
  const actions = useMemo(() => {
    switch (layerType) {
      case LayerType.material:
        return []
      case LayerType.text:
        return []
      case LayerType.brush:
        return pathEffectStack
      case LayerType.album:
        return shaderStack
      default:
        return []
    }
  }, [layerType])

  return (
    <XStack
      minHeight={String(actionButtonHeight)}
      space={defaultStackSpace}
      justifyContent="center"
      {...props}
    >
      {actions.map(({ name, ...action }) => (
        <ActionButton key={name} {...action} onPress={() => onAction?.(name)}>
          {t(name)}
        </ActionButton>
      ))}
    </XStack>
  )
}

type SliderStackProps = GetProps<typeof YStack> & {
  layerType?: LayerType
  value?: number
  onChange?: (value: number) => void
}

const brushSizeSliderProps = {
  name: 'brush size',
  extra: <SRIconButton icon={<Undo2 color="black" size="$1.5" />} />,
}

const contrastRatioProps = {
  name: 'contrast ratio',
}

// 辅助动作区
export const SliderStack: React.FC<SliderStackProps> = ({
  layerType,
  value,
  onChange,
  ...props
}) => {
  const { t } = useTranslation()

  const actionProps = useMemo(() => {
    switch (layerType) {
      case LayerType.material:
        return undefined
      case LayerType.text:
        return undefined
      case LayerType.brush:
        return brushSizeSliderProps
      case LayerType.album:
        return contrastRatioProps
      default:
        return undefined
    }
  }, [layerType])

  return (
    <YStack minHeight={String(actionSliderHeight)} {...props}>
      {actionProps && (
        <ActionSlider
          {...actionProps}
          name={t(actionProps.name)}
          value={value}
          onChange={onChange}
        />
      )}
    </YStack>
  )
}
