import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../hooks/useReduxHooks'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { api_conversation_messages_data, userBaseData } from '../../types'
import { AxiosError } from 'axios'
import { Flex, Heading, IconButton, Image, useBreakpoint, useColorModeValue } from '@chakra-ui/react'
import { ChevronLeft } from 'lucide-react'
import Message from '../components/conversationsPage/Message'
import MessageInput from '../components/conversationsPage/MessageInput'

const SingleConversationPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { conversationId } = useParams()
  const axiosPrivate = useAxiosPrivate()
  const auth = useAppSelector((state) => state.auth)
  const hiddenBreakpoint = ['base', 'sm', 'md', 'lg']
  const breakpoint = useBreakpoint()
  const [userData, setUserData] = useState<userBaseData | null>(null)
  const [messages, setMessages] = useState<api_conversation_messages_data | null>(null)
  let lastId = ''

  const getMessages = async (controller: AbortController) => {
    try {
      const result = await axiosPrivate.get('/protected/conversation/messages', {
        signal: controller.signal,
        params: { conversationId, lastId },
      })
      if (lastId === '' && messages === null) {
        setMessages(result.data)
        lastId = result.data[result.data.length - 1].id
      } else {
        const oldMessages = messages as any
        setMessages([...(oldMessages as api_conversation_messages_data[]), ...result.data])
        lastId = result.data[result.data.length - 1].id
      }
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        navigate('/sign-in', { state: { from: location }, replace: true })
      } else {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getUserData = async () => {
      try {
        const result = await axiosPrivate.get('/protected/conversation/user', {
          signal: controller.signal,
          params: { conversationId },
        })
        setUserData(result.data)
      } catch (error) {
        if ((error as AxiosError).response?.status === 401) {
          navigate('/sign-in', { state: { from: location }, replace: true })
        } else {
          console.log(error)
        }
      }
    }
    getUserData()
    getMessages(controller)

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [conversationId])

  return (
    <Flex
      flexDirection='column'
      width='100%'
      borderLeftColor={useColorModeValue('gray.50', 'gray.900')}
      borderLeftWidth={hiddenBreakpoint.includes(breakpoint) ? 0 : 4}
      height={['100%', null, '100vh']}
      mt={[-2, null, -16]}
      p={4}
      pb={2}
      gap={4}
    >
      <Flex gap={2} alignItems='center'>
        <IconButton
          aria-label='Back'
          icon={<ChevronLeft size={32} />}
          isRound
          p={0}
          variant='ghost'
          minWidth={0}
          height='min-content'
          mr={2}
        />
        <Image alt='Profile picture' src={userData?.imageUrl} width={10} height={10} rounded='100%' />
        <Heading size='lg'>{userData?.username}</Heading>
      </Flex>
      <Flex flexDirection='column-reverse' width='100%' height='100%' overflow='scroll' gap={1}>
        {messages !== null &&
          messages.length > 0 &&
          messages.map((m) => <Message content={m.content} owner={m.senderId === auth.id} key={m.id} />)}
      </Flex>
      <MessageInput conversationId={conversationId as string} />
    </Flex>
  )
}

export default SingleConversationPage
