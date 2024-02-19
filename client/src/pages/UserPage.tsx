import { Center } from '@chakra-ui/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Loading from '../components/Loading'
import { api_user_username_data } from '../../types'
import UserInfo from '../components/userPage/UserInfo'
import NotAllowed from '../components/NotAllowed'
import NoPosts from '../components/userPage/NoPosts'
import UserPostsContainer from '../components/userPage/UserPostsContainer'
import { AxiosError } from 'axios'
import { Helmet } from 'react-helmet-async'
import useErrorPopup from '../hooks/useErrorPopup'

const UserPage = () => {
  const { username } = useParams()
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation()
  const navigate = useNavigate()
  const errorPopup = useErrorPopup()

  const [data, setData] = useState<api_user_username_data | null>(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getUser = async () => {
      try {
        const result = await axiosPrivate.get(`/protected/user/getData/${username}`, { signal: controller.signal })
        setData(result.data)
      } catch (error) {
        const errorStatus = (error as AxiosError).response?.status as number
        if (errorStatus === 401) {
          navigate('/sign-in', { state: { from: location }, replace: true })
          errorPopup({ name: 'Session expired' })
        } else if (errorStatus === 404) {
          navigate('/', { replace: true })
          errorPopup({ name: 'Something went wrong' })
        } else if ((error as AxiosError).message === 'canceled') {
          return
        } else {
          console.log(error)
        }
      }
    }
    getUser()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [username])

  if (data === null) {
    return (
      <>
        <Helmet>
          <title>Loading - Clonegram</title>
          <meta name='description' content={`Clonegram ${username} user page`} />
        </Helmet>
        <Loading />
      </>
    )
  }
  return (
    <Center flexDirection='column' gap={20}>
      <Helmet>
        <title>{username} Page - Clonegram</title>
        <meta name='description' content={`Clonegram ${username} user page`} />
      </Helmet>
      <UserInfo isFollowing={data.isFollowing} isOwnUser={data.isOwnUser} isRequested={data.isRequested} userInfo={data.user} />
      {!data.isAllowed ? <NotAllowed /> : data.posts.length === 0 ? <NoPosts /> : <UserPostsContainer posts={data.posts} />}
    </Center>
  )
}

export default UserPage
