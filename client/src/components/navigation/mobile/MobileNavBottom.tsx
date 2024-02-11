import { Flex, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { CircleUserRound, Home, ImagePlus, LogOut, Moon, Search, Sun } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxHooks'
import { setTabClose, setTabToggle } from '../../../app/tabsSlice'
import useLogout from '../../../hooks/useLogout'

const MobileNavBottom = () => {
  const auth = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { colorMode, toggleColorMode } = useColorMode()
  const logout = useLogout()

  return (
    <Flex
      width='100%'
      position='fixed'
      bottom={0}
      justifyContent='space-between'
      py={2}
      px={7}
      background={useColorModeValue('gray.50', 'gray.900')}
      zIndex={10}
    >
      <IconButton
        aria-label='Home'
        icon={<Home />}
        variant='ghost'
        isRound
        onClick={() => {
          dispatch(setTabClose())
          navigate('/')
        }}
      />
      <IconButton aria-label='Search' icon={<Search />} variant='ghost' isRound onClick={() => dispatch(setTabToggle('search'))} />
      <IconButton
        aria-label='Add post'
        icon={<ImagePlus />}
        variant='ghost'
        isRound
        onClick={() => dispatch(setTabToggle('createPost'))}
      />
      <Menu>
        <MenuButton as={IconButton} aria-label='User menu' icon={<CircleUserRound />} variant='ghost' isRound />
        <MenuList>
          <MenuItem
            icon={<Image width={6} height={6} src={auth.imageUrl} alt='Profile picture' rounded='100%' fit='cover' />}
            onClick={() => {
              dispatch(setTabClose())
              navigate(`/user/${auth.username}`)
            }}
          >
            {auth.username}
          </MenuItem>
          <MenuItem
            icon={colorMode === 'dark' ? <Sun width={24} height={24} /> : <Moon width={24} height={24} />}
            onClick={() => toggleColorMode()}
            closeOnSelect={false}
          >
            {colorMode === 'dark' ? 'Light mode' : 'Dark mode'}
          </MenuItem>
          <MenuItem
            icon={<LogOut width={24} height={24} />}
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
  )
}

export default MobileNavBottom
