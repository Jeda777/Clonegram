import { Flex, Input, useBreakpoint, useColorModeValue } from '@chakra-ui/react'
import { useAppSelector } from '../../hooks/useReduxHooks'

const SearchTab = () => {
  const tabsState = useAppSelector((state) => state.tabs)
  const isOpen = tabsState.isOpen && tabsState.type === 'search'
  const breakpoint = useBreakpoint()
  return (
    <Flex
      flexDirection='column'
      background={useColorModeValue('white', 'gray.800')}
      zIndex={5}
      width={['100%', null, 'auto']}
      pt={breakpoint === 'base' || breakpoint === 'sm' ? 16 : 14}
      pb={14}
      px={7}
      position='fixed'
      left={breakpoint === 'base' || breakpoint === 'sm' ? '0' : isOpen ? '0' : '-100%'}
      top={(breakpoint === 'base' && !isOpen) || (breakpoint === 'sm' && !isOpen) ? '-100%' : '0'}
      height='100vh'
    >
      <Input />
    </Flex>
  )
}

export default SearchTab
