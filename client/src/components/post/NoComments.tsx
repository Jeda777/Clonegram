import { Flex, Text } from '@chakra-ui/react'
import { MessageCircle } from 'lucide-react'

const NoComments = () => {
  return (
    <Flex flexDirection='column' gap={2} mx='auto' alignItems='center' py={4}>
      <MessageCircle width='32' height='32' />
      <Text fontSize='lg'>No comment yet</Text>
    </Flex>
  )
}

export default NoComments
