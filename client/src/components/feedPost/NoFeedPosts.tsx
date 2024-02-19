import { Center, Text } from '@chakra-ui/react'
import { ImageOff } from 'lucide-react'

const NoFeedPosts = () => {
  return (
    <Center flexDirection='column' gap={8}>
      <ImageOff height={192} width={192} />
      <Text fontWeight='600' fontSize='xl'>
        You don't have any posts to see
      </Text>
    </Center>
  )
}

export default NoFeedPosts
