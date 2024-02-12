import { axiosPrivate } from '../api/axios'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { useAppSelector } from './useReduxHooks'

interface InternalAxiosRequestConfigWithSent extends InternalAxiosRequestConfig {
  sent?: boolean
}

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const auth = useAppSelector((state) => state.auth)

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const prevRequest: InternalAxiosRequestConfigWithSent | undefined = error.config
        if (error.response?.status === 401 && !prevRequest?.sent && prevRequest) {
          prevRequest.sent = true

          const newAccessToken = await refresh()

          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

          return axiosPrivate(prevRequest)
        }

        return Promise.reject(error)
      },
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor)
      axiosPrivate.interceptors.response.eject(responseInterceptor)
    }
  }, [auth, refresh])

  return axiosPrivate
}

export default useAxiosPrivate
