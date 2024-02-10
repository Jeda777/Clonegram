import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import Loading from './Loading'
import { useAppSelector } from '../hooks/useReduxHooks'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useRefreshToken()
  const auth = useAppSelector((state) => state.auth)

  useEffect(() => {
    let isMounted = true
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (error) {
        console.log(error)
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    auth.accessToken === '' && auth.persist ? verifyRefreshToken() : setIsLoading(false)

    return () => {
      isMounted = false
    }
  }, [])

  return <>{!auth.persist ? <Outlet /> : isLoading ? <Loading /> : <Outlet />}</>
}

export default PersistLogin
