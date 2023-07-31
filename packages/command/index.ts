import { useSettingStore } from '@my/stores'
import { useQuery } from 'react-query'
import axios from 'axios'

const REPORT_STATUS = 'reportstatus'
const FILE_LIST = 'upload'
const COMMAND = 'command'

const getBaseURL = () => {
  const IPAddress = useSettingStore.getState().IPAddress
  return IPAddress ? `http://${IPAddress}:80/` : ''
}

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
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

export const useReportstatus = () => {
  // TODO: 100ms 轮询，失败时自动中断请求
  return useQuery(
    'status',
    async () => {
      const res = await axios({
        baseURL: getBaseURL(),
        url: REPORT_STATUS,
        method: 'GET',
      })
      useSettingStore.setState({
        isConnected: !!res?.data,
      })
    },
    { refetchOnWindowFocus: false, refetchOnMount: false, enabled: false }
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
  return useQuery<FileList>(
    'status',
    async (meta) => {
      console.log(meta,)
      const res = await axios({
        baseURL: getBaseURL(),
        url: FILE_LIST,
        method: 'GET',
        params: {
          path: '/',
          PAGEID: 0,
        },
      })
      return res?.data || {}
    },
    { refetchOnWindowFocus: false, refetchOnMount: false, enabled: false }
  )
}

export const useHandleExecPrint = ({ path, fileName }: { path: string; fileName: string }) => {
  return useQuery(
    'status',
    async () => {
      const res = await axios({
        baseURL: getBaseURL(),
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
    { refetchOnWindowFocus: false, refetchOnMount: false, enabled: false }
  )
}
