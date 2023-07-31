import React, { cloneElement } from 'react'
import { useTranslation } from '@my/locales'
import { Checkbox, GetProps, Label, SRIconButton, Slider, SpaceTokens, Text, XStack } from '@my/ui'
import { Check } from '@tamagui/lucide-icons'

const pxSpace: SpaceTokens = '$3.5'
const statusTextPxSpace: SpaceTokens = '$2'
export const actionButtonHeight: SpaceTokens = '$6'
export const actionSliderHeight: SpaceTokens = '$2.5'

export const ActionStatus: React.FC = () => {
  const { t } = useTranslation()

  return (
    <XStack
      px={pxSpace}
      height={'$3'}
      alignItems="center"
      justifyContent="space-between"
      space="$2"
    >
      <Text fontSize="$3" space={statusTextPxSpace}>
        {t('width')}
        <Text>100</Text>mm
        <Text>|</Text>
        {t('height')}
        <Text>100</Text>mm
      </Text>
      <XStack alignItems="center" space="$1.5">
        <Checkbox id="scale" defaultChecked={true} borderRadius="100%">
          <Checkbox.Indicator
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
            backgroundColor={'$primary'}
            borderRadius="100%"
          >
            <Check color="white" />
          </Checkbox.Indicator>
        </Checkbox>
        <Label pt="$2" htmlFor="scale" fontSize="$3">
          {t('fixed scale')}
        </Label>
      </XStack>
    </XStack>
  )
}

export type ActionButtonProps = GetProps<typeof SRIconButton> & {
  type?: 's' | 'l'
  // active?: boolean
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  icon,
  type = 'l',
  /* active, */ ...props
}) => {
  return (
    <SRIconButton
      color={'black'}
      height={actionButtonHeight}
      fontSize={type === 'l' ? '$4' : '$3'}
      icon={cloneElement(icon as JSX.Element, {
        // color: active ? '$primary' : '$inactive',
        color: '$primary',
        size: type === 'l' ? '$3' : '$2',
      })}
      flexDirection="column"
      {...props}
    >
      {children}
    </SRIconButton>
  )
}

export interface ActionSliderProps {
  value?: number
  onChange?: (value: number) => void
  name: string
  extra?: React.ReactNode
  unit?: string
  max?: number
  min?: number
  step?: number
}

export const ActionSlider: React.FC<ActionSliderProps> = ({
  value = 0,
  onChange,
  name,
  extra,
  unit,
  max,
  min,
  step,
}) => {
  return (
    <XStack
      px={pxSpace}
      height={actionSliderHeight}
      alignItems="center"
      space="$2"
      justifyContent="center"
    >
      <Text>{name}</Text>
      <Text>
        {value}
        {unit}
      </Text>
      <Slider
        onValueChange={(values) => onChange?.(values[0]!)}
        flex={1}
        defaultValue={[value]}
        max={max}
        step={step}
        min={min}
      >
        <Slider.Track backgroundColor={'$inactive'}>
          <Slider.TrackActive backgroundColor={'$primary'} />
        </Slider.Track>
        <Slider.Thumb circular index={0} size={'$1'} backgroundColor={'black'} />
      </Slider>
      {extra}
    </XStack>
  )
}
