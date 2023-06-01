import { ListItem, SRButton, SRIconButton, XStack, YGroup, YStack } from '@my/ui'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from '@my/locales'
import { Play, Trash2, FileImage, FileSearch, FilePlus2 } from '@tamagui/lucide-icons'

export const FileListScreen = () => {
  const { bottom } = useSafeAreaInsets()
  const { t } = useTranslation()

  return (
    <YStack backgroundColor={'white'} flex={1}>
      <YGroup backgroundColor={'white'} borderRadius={0} scrollable flex={1}>
        {Array.from({ length: 11 }).map((_file, key) => (
          <YGroup.Item key={key}>
            <ListItem
              backgroundColor={'white'}
              borderStyle={'solid'}
              borderBottomWidth={1}
              borderBottomColor={'#CBCBCB'}
              icon={<FileImage size={'$1.5'} color="$primary" />}
              title="star"
              iconAfter={
                <XStack space={'$3'}>
                  <SRIconButton size="$2" icon={Play} circular borderWidth={2} paddingLeft={2} />
                  <SRIconButton size="$2" icon={Trash2} circular borderWidth={2} />
                </XStack>
              }
            />
          </YGroup.Item>
        ))}
      </YGroup>
      <XStack space="$4" justifyContent="center" bottom={bottom}>
        <SRIconButton
          color={'black'}
          height={'$8'}
          icon={<FileSearch color="$primary" size="$2" />}
          flexDirection="column"
        >
          {t('scan file')}
        </SRIconButton>
        <SRIconButton
          color={'black'}
          height={'$8'}
          icon={<FilePlus2 color="$primary" size="$2" />}
          flexDirection="column"
        >
          {t('choose file')}
        </SRIconButton>
      </XStack>
    </YStack>
  )
}
