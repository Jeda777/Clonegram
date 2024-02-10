import axios from '../api/axios'
import { setAccessToken, setAuthData } from '../app/authSlice'
import { useAppDispatch, useAppSelector } from './useReduxHooks'

const useRefreshToken = () => {
  const auth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const refresh = async () => {
    if (auth.username === '' || auth.username === undefined) {
      const result = await axios.get('/refresh', { withCredentials: true, params: { getUserInfo: true } })
      dispatch(
        setAuthData({
          email: result.data.email,
          accessToken: result.data.accessToken,
          id: result.data.id,
          imageUrl: result.data.imageUrl,
          username: result.data.username,
        }),
      )
      return result.data.accessToken
    }
    const result = await axios.get('/refresh', { withCredentials: true })
    dispatch(setAccessToken(result.data.accessToken))
    return result.data.accessToken
  }
  return refresh
}

export default useRefreshToken
