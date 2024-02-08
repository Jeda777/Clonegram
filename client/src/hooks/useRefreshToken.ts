import { authObject } from '../../types'
import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth()

  const refresh = async () => {
    if (auth.username === '' || auth.username === undefined) {
      const result = await axios.get('/refresh', { withCredentials: true, params: { getUserInfo: true } })
      setAuth({
        email: result.data.email,
        accessToken: result.data.accessToken,
        id: result.data.id,
        imageUrl: result.data.imageUrl,
        username: result.data.username,
      })
      return result.data.accessToken
    }
    const result = await axios.get('/refresh', { withCredentials: true })
    setAuth((prev: authObject) => {
      return { ...prev, accessToken: result.data.accessToken }
    })
    return result.data.accessToken
  }
  return refresh
}

export default useRefreshToken
