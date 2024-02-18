import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { AxiosError } from 'axios'
import { api_conversation_all_data } from '../../types'
import { Helmet } from 'react-helmet-async'
import Loading from '../components/Loading'
import { Center, Flex, Heading } from '@chakra-ui/react'
import NoConversations from '../components/conversationsPage/NoConversations'
import Conversation from '../components/conversationsPage/Conversation'
import { useAppSelector } from '../hooks/useReduxHooks'

const ConversationsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const axiosPrivate = useAxiosPrivate()
  const username = useAppSelector((state) => state.auth.username)
  const [data, setData] = useState<api_conversation_all_data[] | null>(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getData = async () => {
      try {
        const result = await axiosPrivate.get('/protected/conversation/all', { signal: controller.signal })
        setData(result.data)
      } catch (error) {
        if ((error as AxiosError).response?.status === 401) {
          navigate('/sign-in', { state: { from: location }, replace: true })
        } else {
          console.log(error)
        }
      }
    }
    if (location.pathname.endsWith('conversations')) getData()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [location])

  if (data === null) {
    return (
      <>
        <Helmet>
          <title>Loading - Clonegram</title>
          <meta name='description' content='Clonegram conversations page' />
        </Helmet>
        <Loading />
      </>
    )
  } else if (data.length === 0) {
    return <NoConversations />
  } else {
    return (
      <Center pt={[2, null, 16]} display='flex' flexDirection='column' gap={4}>
        <Helmet>
          <title>sdfgasdgfdg</title>
          <meta name='description' content='Clonegram conversations page' />
        </Helmet>
        <Heading>Conversations</Heading>
        <Flex flexDirection='column' gap={2} width='90%' alignItems='center'>
          {data.map((c) => {
            const otherUser = c.user1.username !== username ? c.user1 : c.user2
            const sender = c.messages.length === 0 ? undefined : c.messages[0]?.sender.username !== username ? 'other' : 'own'
            return (
              <Conversation
                imageUrl={otherUser.imageUrl}
                username={otherUser.username}
                lastMessage={sender === undefined ? undefined : c.messages[0].content}
                lastMessageSender={sender}
                lastUpdate={c.updatedAt}
                conversationId={c.id}
                key={c.id}
              />
            )
          })}
        </Flex>
      </Center>
    )
  }
}

export default ConversationsPage
