import React, { cloneElement, useRef } from 'react'
import { useTranslation } from '@my/locales'
import {
  Checkbox,
  GetProps,
  Label,
  SRIconButton,
  ScrollView,
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
import { DrawingBoard, DrawingBoardRef } from '@my/skia'

const statusTextPxSpace: SpaceTokens = '$2'
const ActionStatus = () => {
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

const ActionButton: React.FC<
  GetProps<typeof SRIconButton> & { type?: 's' | 'l' /* active?: boolean */ }
> = ({ children, icon, type = 'l', /* active, */ ...props }) => {
  return (
    <SRIconButton
      color={'black'}
      height={'$8'}
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

const ActionSlider: React.FC<{
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

/**
 * @description
 * 状态区
 * 画布
 * 辅助动作区
 *  - 路径(Path Effect)
 *  - 着色器(Blend Shader)
 * 辅助动作区
 *  - 画笔大小(stroke)
 *  - 对比度(contrast)
 */
export const CarveScene = () => {
  const { t } = useTranslation()
  const drawingBoardRef = useRef<DrawingBoardRef>(null)

  return (
    <YStack flex={1}>
      <ScrollView>
        <ActionStatus />
        <DrawingBoard ref={drawingBoardRef} />
        <XStack space="$4" justifyContent="center">
          <ActionButton active type="s" icon={<MenuSquare />}>
            {t('solid')}
          </ActionButton>
          <ActionButton type="s" icon={<Square />}>
            {t('hollow')}
          </ActionButton>
        </XStack>
        <XStack space="$4" justifyContent="center">
          <ActionButton type="s" icon={<Contrast />}>
            {t('b/w')}
          </ActionButton>
          <ActionButton active type="s" icon={<Droplet />}>
            {t('grayscale')}
          </ActionButton>
          <ActionButton type="s" icon={<Lasso />}>
            {t('outline')}
          </ActionButton>
          <ActionButton type="s" icon={<Palette />}>
            {t('true tone')}
          </ActionButton>
        </XStack>
        <ActionSlider
          name={t('brush size')}
          extra={<SRIconButton icon={<Undo2 color="black" size="$1.5" />} />}
        />
        <ActionSlider name={t('contrast ratio')} />
        <ActionSlider name={t('carve precision')} />
        <ActionSlider name={t('carve speed')} />
        <ActionSlider name={t('laser power')} />
        <XStack px={pxSpace} justifyContent="space-between">
          <ActionButton icon={<Layers />}>{t('material')}</ActionButton>
          <ActionButton icon={<Type />}>{t('text')}</ActionButton>
          <ActionButton icon={<Brush />}>{t('brush')}</ActionButton>
          <ActionButton onPress={() => drawingBoardRef?.current?.pickImage?.()} active icon={<Image />}>
            {t('album')}
          </ActionButton>
          <ActionButton icon={<View />}>{t('preview')}</ActionButton>
        </XStack>
      </ScrollView>
    </YStack>
  )
}
