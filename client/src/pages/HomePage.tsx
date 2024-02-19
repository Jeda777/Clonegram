import { Center, Flex } from '@chakra-ui/react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useEffect, useRef, useState } from 'react'
import { api_myFeed_data } from '../../types'
import MyFeedPost from '../components/feedPost/MyFeedPost'
import Loading from '../components/Loading'
import { Helmet } from 'react-helmet-async'
import NoFeedPosts from '../components/feedPost/NoFeedPosts'

function HomePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const [data, setData] = useState<api_myFeed_data>({ posts: [], isLast: false, newLastId: '' })
  const [isLoading, setIsLoading] = useState(false)
  let isFetching = false
  const dataRef = useRef<api_myFeed_data>(data)
  dataRef.current = data

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getData = async () => {
      try {
        dataRef.current.posts.length === 0 && setIsLoading(true)
        isFetching = true
        const res = await axiosPrivate.get('/protected/myFeed', {
          params: { lastId: dataRef.current.newLastId },
          signal: controller.signal,
        })
        if (dataRef.current === res.data) {
          return
        } else if (dataRef.current.posts.length === 0) {
          dataRef.current.posts.length === 0 && setIsLoading(false)
          isFetching = false
          setData(res.data)
        } else {
          dataRef.current.posts.length === 0 && setIsLoading(false)
          isFetching = false
          setData({
            posts: [...dataRef.current.posts, ...res.data.posts],
            isLast: res.data.isLast,
            newLastId: res.data.newLastId,
          })
        }
      } catch (error) {
        if ((error as AxiosError).response?.status === 401) {
          navigate('/sign-in', { state: { from: location }, replace: true })
        } else {
          console.log(error)
        }
      }
    }

    getData()

    const handleScroll = () => {
      const rect = document.getElementById('bottom-div')?.getBoundingClientRect()
      if (rect) {
        const isVisible = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        if (isVisible && !dataRef.current.isLast && !isFetching) {
          getData()
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      isMounted = false
      controller.abort()
    }
  }, [])

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading - Clonegram</title>
          <meta name='description' content='Clonegram user my feed page' />
        </Helmet>
        <Loading />
      </>
    )
  }
  return (
    <Center pt={[2, null, 16]}>
      <Helmet>
        <title>My Feed - Clonegram</title>
        <meta name='description' content='Clonegram user my feed page' />
      </Helmet>
      {data.posts.length === 0 ? (
        <NoFeedPosts />
      ) : (
        <Flex flexDirection='column' gap={4} width={['90%']} pb={10} alignItems='center'>
          {data.posts.map((p) => (
            <MyFeedPost key={p.id} post={p} />
          ))}
          <Flex id='bottom-div'></Flex>
        </Flex>
      )}
    </Center>
  )
}

export default HomePage
