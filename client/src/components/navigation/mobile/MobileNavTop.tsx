import { Flex, IconButton } from '@chakra-ui/react'
import { Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MobileNavTop = () => {
  const navigate = useNavigate()

  return (
    <Flex width='100%' position='fixed' top={0} justifyContent='end' py={2} px={7}>
      <IconButton aria-label='Conversations' icon={<Send />} variant='ghost' isRound onClick={() => navigate('/conversations')} />
    </Flex>
  )
}

export default MobileNavTop
