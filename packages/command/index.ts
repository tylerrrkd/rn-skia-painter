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

axios.defaults.timeout = 5000

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

export const useReportStatus = () => {
  // TODO: 100ms 轮询，失败时自动中断请求
  return useRequest(
    async () => {
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
      manual: true,
      onError: () => {},
    }
  )
}

export interface FileList {
  files: {
    name: string
    shortname: string
    size: string
    datetime: string
  }[]
  path: string
  total: string
  used: string
  occupation: string
  mode: string
  status: string
}

export const useFileList = () => {
  return useRequest(
    async () => {
      const res = await axios({
        url: FILE_LIST,
        method: 'GET',
        params: {
          path: '/',
          PAGEID: 0,
        },
      })
      return res?.data || {}
    },
    { cacheKey: FILE_LIST, manual: true }
  )
}

export const useHandleExecPrint = ({ path, fileName }: { path: string; fileName: string }) => {
  return useRequest(
    async () => {
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
    { manual: true }
  )
}
