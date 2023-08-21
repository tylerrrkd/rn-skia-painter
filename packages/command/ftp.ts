import FTP, { type FtpSetupConfiguration } from 'react-native-ftp-client-latest'
import type { EmitterSubscription } from 'react-native'

interface FTPSetupConfig extends Partial<Omit<FtpSetupConfiguration, 'ip_address'>> {
  ip_address: string
}

export const getFtpClient = ({
  ip_address,
  port = 21,
  username = '1',
  password = '1',
}: FTPSetupConfig) =>
  FTP.setup({
    ip_address,
    port,
    username,
    password,
  })

export const uploadFileTo = async ({
  ip_address,
  port = 21,
  username = '1',
  password = '1',
  localPath,
  remote_file_path = '/',
  onProgress,
  onFinish,
  onError,
}: FTPSetupConfig & {
  localPath: string
  remote_file_path?: string
  onProgress?: (percentage: number) => void
  onFinish?: (percentage: number) => void
  onError?: (error: Error) => void
}) => {
  FTP.setup({
    ip_address,
    port,
    username,
    password,
  }) // Setup host

  let subscription: EmitterSubscription | undefined

  try {
    let currentToken = ''
    subscription = FTP.addProgressListener(({ token, percentage }) => {
      if (percentage === 0) {
        // record token
        currentToken = token
      }
      if (token !== currentToken) {
        // ignore
      } else {
        onProgress?.(percentage)
        // show percentage. it is a integer
        if (percentage >= 100) {
          // finish upload
          onFinish?.(percentage)
        }
      }
    })
    await FTP.uploadFile(localPath, remote_file_path)
    // continue after upload finish
  } catch (error) {
    if (error.message === FTP.ERROR_MESSAGE_CANCELLED) {
      // the upload is cancelled
    }
    onError?.(error)
    // other error
  } finally {
    subscription?.remove?.()
  }
}
