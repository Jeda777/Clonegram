import { Flex, Image, Text } from '@chakra-ui/react'
import { MoveDownRight, MoveUpLeft } from 'lucide-react'
import moment from 'moment'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

interface props {
  username: string
  imageUrl: string
  lastMessage: string | undefined
  lastMessageSender: 'own' | 'other' | undefined
  lastUpdate: Date
  conversationId: string
}

const Conversation = ({ username, imageUrl, lastMessage, lastMessageSender, lastUpdate, conversationId }: props) => {
  const navigate = useNavigate()

  const handleKey = (e: any) => {
    const key = (e as KeyboardEvent).key
    if (key === 'Enter') {
      navigate(`/conversations/${conversationId}`)
    }
  }

  return (
    <Flex
      width='100%'
      maxWidth='400px'
      gap={2}
      onClick={() => navigate(`/conversations/${conversationId}`)}
      onKeyDown={(e) => handleKey(e)}
      role='button'
      aria-pressed='false'
      tabIndex={0}
    >
      <Image alt='Profile picture' src={imageUrl} width={12} aspectRatio={1} rounded='100%' />
      <Flex flexDirection='column' width='100%'>
        <Text fontWeight='600'>{username}</Text>
        <Flex width='100%' gap={2} alignItems='center'>
          <Text fontSize='sm' display='flex' alignItems='center' gap={2} maxWidth={['100px', '150px']} noOfLines={1}>
            {lastMessage}
          </Text>
          {lastMessageSender === 'own' ? (
            <MoveUpLeft size={16} />
          ) : lastMessageSender === 'other' ? (
            <MoveDownRight size={16} />
          ) : null}
          <Text ml='auto' fontSize='xs'>
            {moment(lastUpdate).fromNow()}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default memo(Conversation)
