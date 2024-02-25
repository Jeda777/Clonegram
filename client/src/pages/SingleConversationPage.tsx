import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../hooks/useReduxHooks'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { api_conversation_messages_data, api_conversation_messages_data_message, userBaseData } from '../../types'
import { AxiosError } from 'axios'
import { Button, Flex, Heading, IconButton, Image, useBreakpoint, useColorModeValue } from '@chakra-ui/react'
import { ChevronLeft } from 'lucide-react'
import Message from '../components/conversationsPage/Message'
import MessageInput from '../components/conversationsPage/MessageInput'
import useErrorPopup from '../hooks/useErrorPopup'

const SingleConversationPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/conversations'
  const { conversationId } = useParams()
  const axiosPrivate = useAxiosPrivate()
  const auth = useAppSelector((state) => state.auth)
  const socket = useAppSelector((state) => state.socket)
  const hiddenBreakpoint = ['base', 'sm', 'md', 'lg']
  const breakpoint = useBreakpoint()
  const errorPopup = useErrorPopup()
  const [userData, setUserData] = useState<userBaseData | null>(null)
  const [messages, setMessages] = useState<api_conversation_messages_data>({ messages: [], isLast: false, lastId: '' })
  let isFetching = false
  const dataRef = useRef<api_conversation_messages_data>(messages)
  dataRef.current = messages

  socket.socket.on(`conversation-${conversationId}-newMessage`, (message: api_conversation_messages_data_message) => {
    setMessages({
      isLast: dataRef.current.isLast,
      lastId: dataRef.current.lastId,
      messages: [message, ...dataRef.current.messages],
    })
  })

  const getMessages = async (controller: AbortController) => {
    try {
      isFetching = true
      const result = await axiosPrivate.get(`/protected/conversation/${conversationId}/messages`, {
        signal: controller.signal,
        params: { lastId: dataRef.current.lastId },
      })
      if (dataRef.current === result.data) {
        return
      } else if (dataRef.current.messages.length === 0) {
        isFetching = false
        setMessages(result.data)
      } else {
        isFetching = false
        setMessages({
          messages: [...dataRef.current.messages, ...result.data.messages],
          isLast: result.data.isLast,
          lastId: result.data.lastId,
        })
      }
    } catch (error) {
      const goBackErrors = [400, 403, 404]
      const errorStatus = (error as AxiosError).response?.status as number
      if (errorStatus === 401) {
        navigate('/sign-in', { state: { from: location }, replace: true })
        errorPopup({ name: 'Session expired' })
      } else if (goBackErrors.includes(errorStatus)) {
        navigate('/conversations', { replace: true })
        errorPopup({ name: 'Something went wrong' })
      } else if ((error as AxiosError).message === 'canceled') {
        return
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
        const result = await axiosPrivate.get(`/protected/conversation/${conversationId}/user`, {
          signal: controller.signal,
        })
        setUserData(result.data)
      } catch (error) {
        const goBackErrors = [400, 403, 404]
        const errorStatus = (error as AxiosError).response?.status as number
        if (errorStatus === 401) {
          navigate('/sign-in', { state: { from: location }, replace: true })
          errorPopup({ name: 'Session expired' })
        } else if (goBackErrors.includes(errorStatus)) {
          navigate('/conversations', { replace: true })
          errorPopup({ name: 'Something went wrong' })
        } else if ((error as AxiosError).message === 'canceled') {
          return
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

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const handleScroll = () => {
      const rect = document.getElementById('bottom-div')?.getBoundingClientRect()
      if (rect) {
        const isVisible = rect.bottom >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        if (isVisible && !dataRef.current.isLast && !isFetching) {
          getMessages(controller)
        }
      }
    }

    document.getElementById('messages-scroll')?.addEventListener('scroll', handleScroll)

    return () => {
      isMounted = false
      controller.abort()
      document.getElementById('messages-scroll')?.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
          onClick={() => navigate(from)}
        />
        <Button
          gap={2}
          p={0}
          variant='ghost'
          _hover={{ backgroundColor: 'transparent' }}
          _active={{ backgroundColor: 'transparent' }}
          onClick={() => navigate(`/user/${userData?.username}`)}
        >
          <Image alt='Profile picture' src={userData?.imageUrl} width={10} height={10} rounded='100%' />
          <Heading size='lg'>{userData?.username}</Heading>
        </Button>
      </Flex>
      <Flex id='messages-scroll' flexDirection='column-reverse' width='100%' height='100%' overflow='scroll' gap={1}>
        {messages !== null &&
          messages.messages.length > 0 &&
          messages.messages.map((m) => <Message content={m.content} owner={m.senderId === auth.id} key={m.id} />)}
        <Flex id='bottom-div'></Flex>
      </Flex>
      <MessageInput conversationId={conversationId as string} />
    </Flex>
  )
}

export default SingleConversationPage
