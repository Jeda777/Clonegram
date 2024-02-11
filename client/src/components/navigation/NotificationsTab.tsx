import { Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { useAppSelector } from '../../hooks/useReduxHooks'

const NotificationsTab = () => {
  const tabsState = useAppSelector((state) => state.tabs)
  const isOpen = tabsState.isOpen && tabsState.type === 'notifications'

  const leftClose = [0, null, '-100%']
  const leftOpen = [0, null, '208px', '224px', '272px', '336px']
  const topClose = ['-100%', null, 0]
  const topOpen = 0

  return (
    <Flex
      flexDirection='column'
      background={useColorModeValue('white', 'gray.800')}
      zIndex={5}
      width={['100%', null, 'auto']}
      pt={[16, null, 14]}
      pb={14}
      px={7}
      position='fixed'
      left={isOpen ? leftOpen : leftClose}
      top={isOpen ? topOpen : topClose}
      height='100vh'
    >
      <Text fontSize='xl' textAlign={['center', null, 'left']} fontWeight='600' mr={[0, null, 16]}>
        Notifications
      </Text>
    </Flex>
  )
}

export default NotificationsTab