import axios from '../api/axios'
import { logOut } from '../app/authSlice'
import { useAppDispatch } from './useReduxHooks'

const useLogout = () => {
  const dispatch = useAppDispatch()

  const logout = async () => {
    dispatch(logOut())
    try {
      const result = await axios.get('/logout', { withCredentials: true })
    } catch (error) {
      console.log(error)
    }
  }

  return logout
}

export default useLogout
