import { Flex, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { Moon, Send, Sun } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/useReduxHooks'
import { setTabClose } from '../../../app/tabsSlice'

const MobileNavTop = () => {
  const { colorMode, toggleColorMode } = useColorMode()
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
        aria-label='Theme switch'
        icon={colorMode === 'dark' ? <Sun /> : <Moon />}
        variant='ghost'
        isRound
        onClick={() => toggleColorMode()}
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
