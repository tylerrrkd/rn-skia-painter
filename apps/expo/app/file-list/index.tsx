import { FileListScreen } from 'app/features/file-list/screen'
import { SRScreen } from '@my/ui'
import { useTranslation } from '@my/locales'

export default () => {
  const { t } = useTranslation()

  return (
    <>
      <SRScreen
        options={{
          title: t('file list'),
        }}
      />
      <FileListScreen />
    </>
  )
}
