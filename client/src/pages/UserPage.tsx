import { Center } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Loading from '../components/Loading'
import { api_user_username_data } from '../../types'
import UserInfo from '../components/userPage/UserInfo'

const UserPage = () => {
  const { username } = useParams()
  const axiosPrivate = useAxiosPrivate()

  const [data, setData] = useState<api_user_username_data | null>(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getUser = async () => {
      try {
        const result = await axiosPrivate.get(`/protected/user/getData/${username}`, { signal: controller.signal })
        setData(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  if (data === null) {
    return <Loading />
  }
  return (
    <Center>
      <UserInfo isFollowing={data.isFollowing} isOwnUser={data.isOwnUser} isRequested={data.isRequested} userInfo={data.user} />
    </Center>
  )
}

export default UserPage
