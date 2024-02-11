import { Flex, IconButton, useColorModeValue } from '@chakra-ui/react'
import { Heart, Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/useReduxHooks'
import { setTabClose, setTabToggle } from '../../../app/tabsSlice'

const MobileNavTop = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <Flex
      width='100%'
      position='fixed'
      top={0}
      justifyContent='end'
      gap={2}
      py={2}
      px={7}
      background={useColorModeValue('gray.50', 'gray.900')}
      zIndex={10}
    >
      <IconButton
        aria-label='Search'
        icon={<Heart />}
        variant='ghost'
        isRound
        onClick={() => dispatch(setTabToggle('notifications'))}
      />
      <IconButton
        aria-label='Conversations'
        icon={<Send />}
        variant='ghost'
        isRound
        onClick={() => {
          dispatch(setTabClose())
          navigate('/conversations')
        }}
      />
    </Flex>
  )
}

export default MobileNavTop
