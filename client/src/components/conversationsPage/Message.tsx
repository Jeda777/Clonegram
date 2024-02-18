import { Text, useColorModeValue } from '@chakra-ui/react'
import { memo } from 'react'

interface props {
  owner: boolean
  content: string
}

const Message = ({ content, owner }: props) => {
  return (
    <Text
      alignSelf={owner ? 'end' : 'start'}
      maxWidth='60%'
      p={2}
      rounded='lg'
      color={owner ? 'white' : useColorModeValue('black', 'white')}
      background={owner ? useColorModeValue('blue.400', 'blue.400') : useColorModeValue('gray.50', 'gray.900')}
    >
      {content}
    </Text>
  )
}

export default memo(Message)
