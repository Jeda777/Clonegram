import { Center } from '@chakra-ui/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Loading from '../components/Loading'
import { api_user_username_data } from '../../types'
import UserInfo from '../components/userPage/UserInfo'
import NotAllowed from '../components/userPage/NotAllowed'
import NoPosts from '../components/userPage/NoPosts'
import UserPostsContainer from '../components/userPage/UserPostsContainer'
import { AxiosError } from 'axios'

const UserPage = () => {
  const { username } = useParams()
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation()
  const navigate = useNavigate()

  const [data, setData] = useState<api_user_username_data | null>(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getUser = async () => {
      try {
        const result = await axiosPrivate.get(`/protected/user/getData/${username}`, { signal: controller.signal })
        setData(result.data)
      } catch (error) {
        if ((error as AxiosError).response?.status === 401) {
          navigate('/sign-in', { state: { from: location }, replace: true })
        } else {
          console.log(error)
        }
      }
    }
    if (location.pathname.includes('user')) getUser()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [username, location.pathname])

  if (data === null) {
    return <Loading />
  }
  return (
    <Center flexDirection='column' gap={20}>
      <UserInfo isFollowing={data.isFollowing} isOwnUser={data.isOwnUser} isRequested={data.isRequested} userInfo={data.user} />
      {!data.isAllowed ? <NotAllowed /> : data.posts.length === 0 ? <NoPosts /> : <UserPostsContainer posts={data.posts} />}
    </Center>
  )
}

export default UserPage
