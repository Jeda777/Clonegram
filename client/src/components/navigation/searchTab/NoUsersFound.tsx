import { Center, Text } from '@chakra-ui/react'
import { User } from 'lucide-react'

const NoUsersFound = () => {
  return (
    <Center flexDir='column'>
      <User size={48} />
      <Text fontWeight='600' fontSize='lg'>
        No Users Found
      </Text>
    </Center>
  )
}

export default NoUsersFound
