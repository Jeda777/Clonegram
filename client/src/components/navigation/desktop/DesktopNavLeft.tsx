import {
  Button,
  Flex,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { Home, ImagePlus, Search, Send, Menu as MenuIcon, Sun, Moon, LogOut } from 'lucide-react'
import { setTabClose, setTabOpen } from '../../../app/tabsSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxHooks'
import { useNavigate } from 'react-router-dom'
import useLogout from '../../../hooks/useLogout'

const DesktopNavLeft = () => {
  const auth = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { colorMode, toggleColorMode } = useColorMode()
  const logout = useLogout()

  const buttonProps = {
    variant: 'ghost',
    px: 2,
    iconSpacing: [2, null, null, 4],
    width: [44, null, null, 48, 56, 72],
    height: [10, null, null, null, 12],
    fontSize: ['base', null, null, 'lg', 'xl'],
    justifyContent: 'start',
  }

  return (
    <Flex
      flexDirection='column'
      height='100vh'
      py={14}
      px={[4, null, null, null, 6]}
      gap={[8, null, null, 12, 16]}
      position='fixed'
      background={useColorModeValue('gray.50', 'gray.900')}
      zIndex={10}
    >
      <Heading size={['lg', null, null, null, 'xl']} pl={2}>
        Clonegram
      </Heading>
      <Flex flexDirection='column' alignItems='start' justifyContent='space-between' h='100%'>
        <Flex flexDirection='column' alignItems='start' gap={[2, null, null, 4]}>
          <Button
            aria-label='Home'
            leftIcon={<Home width='1.5em' height='1.5em' />}
            onClick={() => {
              dispatch(setTabClose())
              navigate('/')
            }}
            {...buttonProps}
          >
            Home
          </Button>
          <Button
            aria-label='Search'
            leftIcon={<Search width='1.5em' height='1.5em' />}
            onClick={() => dispatch(setTabOpen('search'))}
            {...buttonProps}
          >
            Search
          </Button>
          <Button
            aria-label='Conversations'
            leftIcon={<Send width='1.5em' height='1.5em' />}
            onClick={() => {
              dispatch(setTabClose())
              navigate('/conversations')
            }}
            {...buttonProps}
          >
            Conversations
          </Button>
          <Button
            aria-label='Add post'
            leftIcon={<ImagePlus width='1.5em' height='1.5em' />}
            onClick={() => dispatch(setTabClose())}
            {...buttonProps}
          >
            Add Post
          </Button>
          <Button
            aria-label='User page'
            leftIcon={<Image width='1.5em' height='1.5em' src={auth.imageUrl} alt='Profile picture' rounded='100%' />}
            onClick={() => {
              dispatch(setTabClose())
              navigate(`/user/${auth.username}`)
            }}
            {...buttonProps}
          >
            {auth.username}
          </Button>
        </Flex>
        <Menu offset={[0, 4]}>
          <MenuButton
            as={Button}
            aria-label='Settings'
            leftIcon={<MenuIcon width='1.5em' height='1.5em' />}
            textAlign='left'
            {...buttonProps}
          >
            More
          </MenuButton>
          <MenuList fontSize={['base', null, null, 'lg', 'xl']}>
            <MenuItem
              icon={colorMode === 'dark' ? <Sun width='1.5em' height='1.5em' /> : <Moon width='1.5em' height='1.5em' />}
              onClick={() => toggleColorMode()}
              closeOnSelect={false}
            >
              {colorMode === 'dark' ? 'Light mode' : 'Dark mode'}
            </MenuItem>
            <MenuItem
              icon={<LogOut width='1.5em' height='1.5em' />}
              onClick={async () => {
                dispatch(setTabClose())
                await logout()
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}

export default DesktopNavLeft
