import { translate, useSettingStore } from '@my/stores'
import { useRequest } from 'ahooks'
import axios from 'axios'

const REPORT_STATUS = 'reportstatus'
const FILE_LIST = 'upload'
const COMMAND = 'command'

const getBaseURL = () => {
  const IPAddress = useSettingStore.getState().IPAddress
  return IPAddress ? `http://${IPAddress}:80/` : ''
}

axios.defaults.timeout = 2000 // global timeout setting

axios.interceptors.request.use(
  (config) => {
    config.baseURL = config.baseURL ?? getBaseURL()
    // Do something before request is sent
    if (!config.baseURL) {
      throw new Error(translate('did not connect to device'))
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    // Do something before request is sent
    return response
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

/**
 * useRequest
 * @see https://ahooks.js.org/hooks/use-request/polling
 */
export const useReportStatus = (IPAddress: string) => {
  // 100ms 轮询，失败时自动中断请求
  return useRequest(
    async () => {
      // console.log('REPORT_STATUS POLLING')
      const res = await axios({
        url: REPORT_STATUS,
        method: 'GET',
      })
      useSettingStore.setState({
        isConnected: !!res?.data,
      })
    },
    {
      cacheKey: REPORT_STATUS,
      ready: !!IPAddress,
      refreshDeps: [IPAddress],
      pollingInterval: 1500,
      pollingErrorRetryCount: 0, // 轮询失败不做尝试
      onError: () => {
        useSettingStore.setState({
          isConnected: false,
        })
      },
    }
  )
}

export interface FileList {
  files: {
    name: string
    shortname: string
    size: string
    datetime: string
    isPrevious: boolean
    isFolder: boolean
    isUnknown: boolean
    isNCFile: boolean
  }[]
  path: string
  total: string
  used: string
  occupation: string
  mode: string
  status: string
}

const ncReg = /^.+(\.nc)$/i

export const useFileList = (path: string = '/') => {
  return useRequest(
    async () => {
      const res = await axios({
        url: FILE_LIST,
        method: 'GET',
        params: {
          path,
          PAGEID: 0,
        },
      })
      const isRootPath = path === '/'
      return ({
        ...res?.data,
        files: [
          ...(isRootPath
            ? []
            : [
                {
                  name: '...',
                  isPrevious: true,
                },
              ]),
          ...res?.data?.files?.map?.((file: FileList['files'][number]) => {
            const isFolder = file.size === '-1'
            const isNCFile = ncReg.test(file.name)
            return {
              ...file,
              isFolder,
              isUnknown: !isNCFile,
              isNCFile,
            }
          }),
        ],
      } || {}) as FileList
    },
    { cacheKey: FILE_LIST, refreshDeps: [path] }
  )
}

/**
 * @description 开始雕刻
 */
export const useHandleExecPrint = (onError?: (error: Error) => void) => {
  return useRequest(
    async ({ path, fileName }: { path: string; fileName: string }) => {
      const res = await axios({
        url: COMMAND,
        method: 'GET',
        params: {
          // command?commandText=%5BESP220%5D/Laser888.nc&PAGEI=0
          commandText: `[ESP220]${path}${fileName}`,
          PAGEID: 0,
        },
      })
      return res?.data
    },
    { manual: true, onError }
  )
}

/**
 * @description 删除文件
 */
export const useHandleDeleteFile = (onSuccess: () => void) => {
  return useRequest(
    async ({ path, fileName }: { path: string; fileName: string }) => {
      const res = await axios({
        url: FILE_LIST,
        method: 'GET',
        params: {
          // upload?path=%2F&action=delete&filename=srwor.nc&PAGEID=0
          path,
          action: 'delete',
          fileName,
          PAGEID: 0,
        },
      })
      console.log(res.data)
      return res?.data
    },
    { manual: true, onSuccess }
  )
}
