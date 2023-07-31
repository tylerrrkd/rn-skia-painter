import { ListItem, SRButton, SRIconButton, Text, XStack, YGroup, YStack } from '@my/ui'
import React, { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from '@my/locales'
import { Play, Trash2, FileImage, FileSearch, FilePlus2 } from '@tamagui/lucide-icons'
import { useFileList, useHandleExecPrint } from '@my/command'

export const FileListScreen = () => {
  const { bottom } = useSafeAreaInsets()
  const { t } = useTranslation()

  const { refetch, data } = useFileList()
  const { refetch: handleExecPrint, isLoading } = useHandleExecPrint({
    path: '/',
    fileName: 'bWhite.nc',
  })

  useEffect(() => {
    refetch()
  }, [])

  return (
    <YStack flex={1}>
      {isLoading ? <Text mx="auto" my="auto">{t('loading')}...</Text> : <>
        <YGroup backgroundColor={'white'} borderRadius={0} scrollable flex={1}>
          {Number(data?.files?.length) <= 0 ? <Text mx="auto" my="auto">{t('content empty')}</Text> : data?.files?.map?.((file, key) => (
            <YGroup.Item key={key}>
              <ListItem
                backgroundColor={'white'}
                borderStyle={'solid'}
                borderBottomWidth={1}
                borderBottomColor={'#CBCBCB'}
                icon={<FileImage size={'$1.5'} color="$primary" />}
                title={file?.name || '-'}
                iconAfter={
                  <XStack space={'$3'}>
                    <SRIconButton
                      size="$2"
                      icon={Play}
                      circular
                      borderWidth={2}
                      paddingLeft={2}
                      onPress={() => {
                        handleExecPrint()
                      }}
                    />
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
      </>}
    </YStack>
  )
}
