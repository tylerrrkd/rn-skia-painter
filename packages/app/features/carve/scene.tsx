import React, { useRef } from 'react'
import { useTranslation } from '@my/locales'
import { ScrollView, SpaceTokens, XStack, YStack } from '@my/ui'
import { Layers, Type, Brush, Image, View } from '@tamagui/lucide-icons'
import { DrawingBoard, DrawingBoardRef } from '@my/skia'
import { ActionButton, ActionStatus } from './actions'
import { ActionStack, SliderStack } from './operations'

const pxSpace: SpaceTokens = '$3.5'

/**
 * @description
 * 状态区
 * 画布
 * 辅助动作区 Action Stack
 *  - 路径(Path Effect)
 *  - 颜色滤镜(Color Filter)
 * 辅助动作区 Slider Stack
 *  - 画笔大小(stroke)
 *  - 对比度(contrast)
 * @description 设计思路
 * 每个图层有自己的状态(LayerInfo)
 * 根据当前选中图层(CurrentLayer)的类型(LayerType)展示配置(Config)
 * 每个图层消费对应的状态
 * 根据图层下发的配置展示各个区域
 * 层级关系 actions -> operation -> carve scene
 */
export const CarveScene = () => {
  const { t } = useTranslation()
  const drawingBoardRef = useRef<DrawingBoardRef>(null)

  return (
    <YStack flex={1}>
      <ScrollView>
        <ActionStatus />
        <DrawingBoard ref={drawingBoardRef} />
        <ActionStack />
        <SliderStack />
        <XStack px={pxSpace} justifyContent="space-between">
          <ActionButton icon={<Layers />}>{t('material')}</ActionButton>
          <ActionButton icon={<Type />}>{t('text')}</ActionButton>
          <ActionButton icon={<Brush />}>{t('brush')}</ActionButton>
          <ActionButton onPress={() => drawingBoardRef?.current?.pickImage?.()} icon={<Image />}>
            {t('album')}
          </ActionButton>
          <ActionButton icon={<View />}>{t('preview')}</ActionButton>
        </XStack>
      </ScrollView>
    </YStack>
  )
}
