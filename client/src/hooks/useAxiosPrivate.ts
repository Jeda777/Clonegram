import { axiosPrivate } from '../api/axios'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import { AxiosError } from 'axios'
import { useAppSelector } from './useReduxHooks'

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
        const prevRequest = error.config
        //@ts-ignore
        if (error.response?.status === 403 && !prevRequest?.sent) {
          //@ts-ignore
          prevRequest.sent = true

          const newAccessToken = await refresh()

          //@ts-ignore
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

          //@ts-ignore
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
