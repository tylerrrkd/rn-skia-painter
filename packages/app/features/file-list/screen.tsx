import { ListItem, SRIconButton, Text, XStack, YGroup, YStack } from '@my/ui'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from '@my/locales'
import {
  Play,
  Trash2,
  FileImage,
  FileSearch,
  FilePlus2,
  FolderClosed,
  FolderOpen,
  FileX,
} from '@tamagui/lucide-icons'
import { FileList, useFileList, useHandleExecPrint } from '@my/command'

const ROOT_PATH = '/'

const SEPERATOR = '/'

const FileIcon: React.FC<{ file: FileList['files'][number] }> = ({ file }) => {
  if (file.isNCFile) {
    return <FileImage size={'$1.5'} color="$primary" />
  } else if (file.isFolder) {
    return <FolderClosed size={'$1.5'} color="$primary" />
  } else if (file.isPrevious) {
    return <FolderOpen size={'$1.5'} color="$primary" />
  } else {
    return <FileX size={'$1.5'} color="$primary" />
  }
}

export const FileListScreen = () => {
  const { bottom } = useSafeAreaInsets()
  const { t } = useTranslation()

  const [path, setPath] = useState(ROOT_PATH)
  const { data, loading } = useFileList(path)
  const { run: handleExecPrint } = useHandleExecPrint()

  return (
    <YStack flex={1}>
      {loading ? (
        <Text mx="auto" my="auto">
          {t('loading')}...
        </Text>
      ) : (
        <>
          <YGroup backgroundColor={'white'} borderRadius={0} scrollable flex={1}>
            {Number(data?.files?.length) <= 0 ? (
              <Text mx="auto" my="auto">
                {t('content is empty')}
              </Text>
            ) : (
              data?.files?.map?.((file, key) => (
                <YGroup.Item key={key}>
                  <ListItem
                    onPress={() => {
                      if (file.isFolder) {
                        setPath((path) => `${path}${SEPERATOR}${file.name}`)
                      } else if (file.isPrevious) {
                        setPath((path) => {
                          const pathArray = path.split(SEPERATOR)
                          pathArray.splice(-1)
                          return pathArray.join(SEPERATOR)
                        })
                      }
                    }}
                    backgroundColor={'white'}
                    borderStyle={'solid'}
                    borderBottomWidth={1}
                    borderBottomColor={'#CBCBCB'}
                    icon={<FileIcon file={file} />}
                    title={file?.name || '-'}
                    iconAfter={
                      file.isNCFile ? (
                        <XStack space={'$3'}>
                          <SRIconButton
                            size="$2"
                            icon={Play}
                            circular
                            borderWidth={2}
                            paddingLeft={2}
                            onPress={() => {
                              handleExecPrint({
                                path,
                                fileName: file.name,
                              })
                            }}
                          />
                          <SRIconButton size="$2" icon={Trash2} circular borderWidth={2} />
                        </XStack>
                      ) : undefined
                    }
                  />
                </YGroup.Item>
              ))
            )}
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
        </>
      )}
    </YStack>
  )
}
