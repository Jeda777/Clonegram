import { Center, Flex } from '@chakra-ui/react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { api_myFeed_data } from '../../types'
import MyFeedPost from '../components/Post'
import Loading from '../components/Loading'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const [data, setData] = useState<api_myFeed_data>({ posts: [], isLast: false, newLastId: '' })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const requestData = data.newLastId === '' ? {} : { lastId: data.newLastId }
        const res = await axiosPrivate.get('/protected/myFeed', { data: requestData })
        if (data.posts.length === 0) {
          setIsLoading(false)
          setData(res.data)
        } else {
          const newData = res.data as api_myFeed_data
          setData((prev) => {
            const newState = {
              posts: [...prev.posts, ...newData.posts],
              isLast: newData.isLast,
              newLastId: newData.newLastId,
            } as api_myFeed_data
            setIsLoading(false)
            return newState
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
  }, [])

  if (isLoading) {
    return <Loading />
  }
  return (
    <Center pt={[2, null, 16]}>
      <Flex flexDirection='column' gap={4} width={['90%']} pb={10} alignItems='center'>
        {data.posts.map((p) => (
          <MyFeedPost key={p.id} post={p} />
        ))}
      </Flex>
    </Center>
  )
}

export default App
