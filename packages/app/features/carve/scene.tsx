import React, { cloneElement } from 'react'
import { useTranslation } from '@my/locales'
import {
  Checkbox,
  GetProps,
  Label,
  SRIconButton,
  Slider,
  SpaceTokens,
  Text,
  XStack,
  YStack,
} from '@my/ui'
import {
  Layers,
  Type,
  Brush,
  Image,
  View,
  Contrast,
  Droplet,
  Lasso,
  Palette,
  Square,
  MenuSquare,
  Undo2,
  Check,
} from '@tamagui/lucide-icons'

const statusTextPxSpace: SpaceTokens = '$2'
const OperationStatus = () => {
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

const OperationButton: React.FC<GetProps<typeof SRIconButton> & { type?: 's' | 'l' }> = ({
  children,
  icon,
  type = 'l',
}) => {
  return (
    <SRIconButton
      color={'black'}
      height={'$8'}
      fontSize={type === 'l' ? '$4' : '$3'}
      icon={cloneElement(icon as JSX.Element, {
        color: '$primary',
        size: type === 'l' ? '$3' : '$2',
      })}
      flexDirection="column"
    >
      {children}
    </SRIconButton>
  )
}

const SliderOperation: React.FC<{
  name: string
  extra?: React.ReactNode
}> = ({ name, extra }) => {
  return (
    <XStack px={pxSpace} height={'$2.5'} alignItems="center" space="$2" justifyContent="center">
      <Text>{name}</Text>
      <Text>50%</Text>
      <Slider flex={1} defaultValue={[50]} max={100} step={1}>
        <Slider.Track backgroundColor={'$inactive'}>
          <Slider.TrackActive backgroundColor={'$primary'} />
        </Slider.Track>
        <Slider.Thumb circular index={0} size={'$1'} backgroundColor={'black'} />
      </Slider>
      {extra}
    </XStack>
  )
}

const pxSpace: SpaceTokens = '$3.5'

enum Operation {
  material,
  text,
  brush,
  album,
  preview,
}

export const CarveScene = () => {
  const { t } = useTranslation()

  return (
    <YStack flex={1}>
      <OperationStatus />
      <XStack space="$4" justifyContent="center">
        <OperationButton type="s" icon={<MenuSquare />}>
          {t('solid')}
        </OperationButton>
        <OperationButton type="s" icon={<Square />}>
          {t('hollow')}
        </OperationButton>
      </XStack>
      <XStack space="$4" justifyContent="center">
        <OperationButton type="s" icon={<Contrast />}>
          {t('b/w')}
        </OperationButton>
        <OperationButton type="s" icon={<Droplet />}>
          {t('grayscale')}
        </OperationButton>
        <OperationButton type="s" icon={<Lasso />}>
          {t('outline')}
        </OperationButton>
        <OperationButton type="s" icon={<Palette />}>
          {t('original color')}
        </OperationButton>
      </XStack>
      <SliderOperation
        name={t('brush size')}
        extra={<SRIconButton icon={<Undo2 color="black" size="$1.5" />} />}
      />
      <SliderOperation name={t('contrast ratio')} />
      <SliderOperation name={t('carve precision')} />
      <SliderOperation name={t('carve speed')} />
      <SliderOperation name={t('laser power')} />
      <XStack px={pxSpace} justifyContent="space-between">
        <OperationButton icon={<Layers />}>{t('material')}</OperationButton>
        <OperationButton icon={<Type />}>{t('text')}</OperationButton>
        <OperationButton icon={<Brush />}>{t('brush')}</OperationButton>
        <OperationButton icon={<Image />}>{t('album')}</OperationButton>
        <OperationButton icon={<View />}>{t('preview')}</OperationButton>
      </XStack>
    </YStack>
  )
}
