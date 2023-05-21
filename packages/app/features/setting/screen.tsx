import { ListItem, ScrollView, YStack } from '@my/ui'
import React from 'react'
import { useTranslation } from '@my/locales'
import { Languages, Link } from '@tamagui/lucide-icons'

const SRListItem: React.FC<React.ComponentProps<typeof ListItem>> = ({ title, icon }) => (
  <ListItem
    borderRadius={'$2'}
    backgroundColor={'white'}
    borderWidth={1}
    borderStyle={'solid'}
    borderColor={'#989898'}
    icon={React.cloneElement(icon as JSX.Element, { size: '$1.5', color: '$primary' })}
    title={title}
    pressStyle={{
      opacity: 0.6,
    }}
  />
)
export const SettingScreen = () => {
  const { t } = useTranslation()

  return (
    <YStack backgroundColor={'white'} flex={1} paddingHorizontal={'$4'}>
      <ScrollView mt="$2.5" flex={1}>
        <YStack space="$2.5">
          <SRListItem icon={<Languages />} title={t('language setting')} />
          <SRListItem icon={<Link />} title={t('connect IP address')} />
        </YStack>
      </ScrollView>
    </YStack>
  )
}
