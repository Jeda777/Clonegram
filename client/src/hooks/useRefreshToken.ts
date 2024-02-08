import axios from 'axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth()

  const refresh = async () => {
    const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/refresh`, { withCredentials: true })
    const currentAuth = auth
    setAuth({ ...currentAuth, accessToken: result.data.accessToken })
    return result.data.accessToken
  }
  return refresh
}

export default useRefreshToken
