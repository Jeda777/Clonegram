import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { AxiosError } from 'axios'
import { api_conversation_all_data } from '../../types'
import { Helmet } from 'react-helmet-async'
import Loading from '../components/Loading'
import { Center, Flex, Heading, useBreakpoint } from '@chakra-ui/react'
import NoConversations from '../components/conversationsPage/NoConversations'
import Conversation from '../components/conversationsPage/Conversation'
import { useAppSelector } from '../hooks/useReduxHooks'
import useErrorPopup from '../hooks/useErrorPopup'

const ConversationsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const axiosPrivate = useAxiosPrivate()
  const errorPopup = useErrorPopup()
  const username = useAppSelector((state) => state.auth.username)
  const [data, setData] = useState<api_conversation_all_data[] | null>(null)
  const breakpoint = useBreakpoint()
  const hiddenBreakpoint = ['base', 'sm', 'md', 'lg']
  const hidden = location.pathname !== '/conversations' && hiddenBreakpoint.includes(breakpoint) ? true : false

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getData = async () => {
      try {
        const result = await axiosPrivate.get('/protected/conversation/all', { signal: controller.signal })
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
    if (location.pathname.includes('conversations')) getData()

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
      <>
        <Center pt={[2, null, 16]} display='flex' height={['calc(100vh - 112px)', null, '100vh']} alignItems='start'>
          <Helmet>
            <title>Conversations - Clonegram</title>
            <meta name='description' content='Clonegram conversations page' />
          </Helmet>
          <Flex hidden={hidden} flexDirection='column' gap={4} width='100%' maxWidth='440px' alignItems='center'>
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
          </Flex>
          <Outlet />
        </Center>
      </>
    )
  }
}

export default ConversationsPage
