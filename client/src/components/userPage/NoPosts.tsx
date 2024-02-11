import { Center, Text } from '@chakra-ui/react'
import { ImageOff } from 'lucide-react'

const NoPosts = () => {
  return (
    <Center flexDirection='column' gap={8}>
      <ImageOff height={192} width={192} />
      <Text fontWeight='600' fontSize='xl'>
        This account dont't have any posts
      </Text>
    </Center>
  )
}

export default NoPosts
