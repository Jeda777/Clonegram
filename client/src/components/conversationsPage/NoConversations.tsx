import { Center, Text } from '@chakra-ui/react'
import { Send } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

const NoConversations = () => {
  return (
    <>
      <Helmet>
        <title>Loading - Clonegram</title>
        <meta name='description' content='Clonegram conversations page' />
      </Helmet>
      <Center height='100vh' display='flex' flexDirection='column' gap={2}>
        <Send size={64} />
        <Text fontWeight='600' fontSize='xl' textAlign='center'>
          You Don't Have Any Conversations
        </Text>
      </Center>
    </>
  )
}

export default NoConversations
