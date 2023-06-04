import {
  GetProps,
  ListItem,
  SRSelector,
  ScrollView,
  Select,
  YStack,
  SRConnectIPDialog,
} from '@my/ui'
import React, { forwardRef } from 'react'
import { languageList, useTranslation } from '@my/locales'
import { Languages, Link, ChevronRight } from '@tamagui/lucide-icons'

const SRListItem: React.FC<GetProps<typeof ListItem>> = forwardRef(
  ({ title, icon, ...props }, ref) => (
    <ListItem
      ref={ref}
      borderRadius={'$2'}
      backgroundColor={'white'}
      borderWidth={'$0.5'}
      borderStyle={'solid'}
      borderColor={'$border'}
      icon={React.cloneElement(icon as JSX.Element, { size: '$1.5', color: '$primary' })}
      title={title}
      pressStyle={{
        opacity: 0.6,
      }}
      {...props}
    />
  )
)

export const SettingScreen = () => {
  const { t, currentLanguage, setLanguage } = useTranslation()

  return (
    <YStack flex={1} paddingHorizontal={'$4'}>
      <ScrollView mt="$2.5" flex={1}>
        <YStack space="$2.5">
          <SRSelector
            native
            title={t('select language')}
            value={currentLanguage.code}
            onValueChange={(languageCode) => {
              const language = languageList.find(({ code }) => languageCode === code)
              language && setLanguage(language)
            }}
            options={languageList?.map?.(({ language, code }) => ({
              label: language,
              value: code,
            }))}
            trigger={() => (
              <SRListItem
                icon={<Languages />}
                title={t('language setting')}
                iconAfter={
                  <>
                    <Select.Value />
                    <ChevronRight />
                  </>
                }
              />
            )}
          />
          <SRConnectIPDialog
            trigger={<SRListItem icon={<Link />} title={t('connect IP address')} />}
          />
        </YStack>
      </ScrollView>
    </YStack>
  )
}
