import { authObject } from '../../types'
import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async () => {
    const result = await axios.get('/refresh', { withCredentials: true })
    setAuth((prev: authObject) => {
      return { ...prev, accessToken: result.data.accessToken }
    })
    //setAuth({ ...currentAuth, accessToken: result.data.accessToken })
    return result.data.accessToken
  }
  return refresh
}

export default useRefreshToken
