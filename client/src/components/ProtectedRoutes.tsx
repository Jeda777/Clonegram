import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/useReduxHooks'

const ProtectedRoutes = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  const location = useLocation()
  return accessToken ? <Outlet /> : <Navigate to='/sign-in' state={{ from: location }} replace />
}

export default ProtectedRoutes
