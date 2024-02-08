import { useContext } from 'react'
import authContext from '../lib/AuthProvider'

const useAuth = () => {
  return useContext(authContext)
}

export default useAuth
