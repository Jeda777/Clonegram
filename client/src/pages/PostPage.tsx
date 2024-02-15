import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useEffect, useState } from 'react'
import { api_posts_data } from '../../types'
import { AxiosError } from 'axios'
import Loading from '../components/Loading'
import { Center, Flex } from '@chakra-ui/react'
import Post from '../components/post/Post'

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
    return <Loading />
  }
  return (
    <Center py={[4, null, 16]}>
      <Flex maxW='90%' alignItems='center'>
        <Post post={data} />
      </Flex>
    </Center>
  )
}

export default PostPage
