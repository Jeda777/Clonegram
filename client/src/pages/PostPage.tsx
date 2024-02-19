import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useEffect, useState } from 'react'
import { api_posts_data } from '../../types'
import { AxiosError } from 'axios'
import Loading from '../components/Loading'
import { Center, Flex } from '@chakra-ui/react'
import Post from '../components/post/Post'
import { Helmet } from 'react-helmet-async'
import NotAllowed from '../components/NotAllowed'

const PostPage = () => {
  const { postId } = useParams()
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation()
  const navigate = useNavigate()

  const [data, setData] = useState<api_posts_data | null>(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getPost = async () => {
      try {
        const result = await axiosPrivate.get(`/protected/posts/${postId}`, { signal: controller.signal })
        setData(result.data)
      } catch (error) {
        if ((error as AxiosError).response?.status === 401) {
          navigate('/sign-in', { state: { from: location }, replace: true })
        } else if ((error as AxiosError).response?.status === 404) {
          navigate('/')
        } else {
          console.log(error)
        }
      }
    }

    if (location.pathname.includes('post')) getPost()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [postId, location.pathname])

  if (data === null) {
    return (
      <>
        <Helmet>
          <title>Loading - Clonegram</title>
          <meta name='description' content={`Clonegram user post page`} />
        </Helmet>
        <Loading />
      </>
    )
  }
  return (
    <Center py={[4, null, 16]}>
      {data.isAllowed && data.post ? (
        <>
          <Helmet>
            <title>{data.post.user.username} Post - Clonegram</title>
            <meta name='description' content={`${data.post.user.username} Post - Clonegram`} />
            <meta property='og:locale' content='en_US' />
            <meta property='og:type' content='website' />
            <meta property='og:title' content={`Clonegram ${data.post.user.username} user post page`} />
            <meta property='og:image' content={data.post.imageUrl} />
            <meta content='image/*' property='og:image:type' />
            <meta property='og:url' content={window.location.href} />
            <meta property='og:site_name' content='Clonegram' />
            <meta property='og:description' content={`Clonegram ${data.post.user.username} user post page`} />
          </Helmet>
          <Flex maxW='883px' width='90%' alignItems='center'>
            <Post post={data.post} />
          </Flex>
        </>
      ) : (
        <>
          <Helmet>
            <title>Private Post - Clonegram</title>
            <meta name='description' content='Private Post - Clonegram' />
            <meta property='og:locale' content='en_US' />
            <meta property='og:type' content='website' />
            <meta property='og:title' content='Clonegram private user post page' />
            <meta property='og:url' content={window.location.href} />
            <meta property='og:site_name' content='Clonegram' />
            <meta property='og:description' content='Clonegram private user post page' />
          </Helmet>
          <NotAllowed />
        </>
      )}
    </Center>
  )
}

export default PostPage
