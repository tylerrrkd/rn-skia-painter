import { useSettingStore } from '@my/stores'
import { useQuery } from 'react-query'
import axios from 'axios'

const REPORT_STATUS = 'reportstatus'

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
