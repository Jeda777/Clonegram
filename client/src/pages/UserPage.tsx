import { Center } from '@chakra-ui/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Loading from '../components/Loading'
import { api_user_saved_data, api_user_username_data } from '../../types'
import UserInfo from '../components/userPage/UserInfo'
import NotAllowed from '../components/NotAllowed'
import NoPosts from '../components/userPage/NoPosts'
import UserPostsContainer from '../components/userPage/UserPostsContainer'
import { AxiosError } from 'axios'
import { Helmet } from 'react-helmet-async'
import useErrorPopup from '../hooks/useErrorPopup'
import ViewToggle from '../components/userPage/ViewToggle'
import SavedContainer from '../components/userPage/SavedContainer'

const UserPage = () => {
  const { username } = useParams()
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation()
  const navigate = useNavigate()
  const errorPopup = useErrorPopup()

  const [tabOpen, setTabOpen] = useState<'posts' | 'saved'>('posts')
  const [data, setData] = useState<api_user_username_data | null>(null)
  const [savedData, setSavedData] = useState<api_user_saved_data[] | null>(null)

  const getSaved = async () => {
    try {
      const result = await axiosPrivate.get(`/protected/user/saved`)
      setSavedData(result.data)
    } catch (error) {
      const errorStatus = (error as AxiosError).response?.status as number
      if (errorStatus === 401) {
        navigate('/sign-in', { state: { from: location }, replace: true })
        errorPopup({ name: 'Session expired' })
      } else if (errorStatus === 404) {
        errorPopup({ name: 'Something went wrong' })
      } else {
        console.log(error)
      }
    }
  }

  const getUser = async () => {
    let isMounted = true
    const controller = new AbortController()
    try {
      const result = await axiosPrivate.get(`/protected/user/${username}/data`, { signal: controller.signal })
      setData(result.data)
      if (result.data.isOwnUser) getSaved()
      return () => {
        isMounted = false
        controller.abort()
      }
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
      return () => {
        isMounted = false
        controller.abort()
      }
    }
  }

  useEffect(() => {
    getUser()
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
    <Center flexDirection='column' gap={8}>
      <Helmet>
        <title>{username} Page - Clonegram</title>
        <meta name='description' content={`Clonegram ${username} user page`} />
      </Helmet>
      <UserInfo
        isFollowing={data.isFollowing}
        isOwnUser={data.isOwnUser}
        isRequested={data.isRequested}
        userInfo={data.user}
        getUser={getUser}
      />
      {data.isOwnUser && <ViewToggle setValue={setTabOpen} value={tabOpen} />}
      {!data.isAllowed && <NotAllowed />}
      {data.isAllowed && data.posts.length === 0 && tabOpen === 'posts' && <NoPosts />}
      {data.isAllowed && savedData && savedData.length === 0 && tabOpen === 'saved' && <NoPosts />}
      {data.isOwnUser && !savedData && tabOpen === 'saved' && <NoPosts />}
      {data.isAllowed && data.posts.length > 0 && tabOpen === 'posts' && <UserPostsContainer posts={data.posts} />}
      {data.isOwnUser && savedData && savedData.length > 0 && tabOpen === 'saved' && <SavedContainer saves={savedData} />}
    </Center>
  )
}

export default UserPage
