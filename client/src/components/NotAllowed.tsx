import { Center, Text } from '@chakra-ui/react'
import { ImageOff } from 'lucide-react'

const NotAllowed = () => {
  return (
    <Center flexDirection='column' gap={8}>
      <ImageOff height={192} width={192} />
      <Text fontWeight='600' fontSize='xl'>
        This account is private follow to see posts
      </Text>
    </Center>
  )
}

export default NotAllowed
