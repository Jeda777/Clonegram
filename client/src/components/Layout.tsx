import { Box, Hide, Show } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import MobileNavBottom from './navigation/mobile/MobileNavBottom'
import MobileNavTop from './navigation/mobile/MobileNavTop'
import SearchTab from './navigation/searchTab/SearchTab'
import DesktopNavLeft from './navigation/desktop/DesktopNavLeft'
import NotificationsTab from './navigation/NotificationsTab'
import CreatePostTab from './navigation/CreatePostTab'
import ShareModal from './ShareModal'

const Layout = () => {
  return (
    <Box py={[14, null, 0]} pl={[0, null, '208px', '224px', '272px', '336px']}>
      <Hide above='md'>
        <MobileNavTop />
        <MobileNavBottom />
      </Hide>
      <Show above='md'>
        <DesktopNavLeft />
      </Show>
      <SearchTab />
      <NotificationsTab />
      <CreatePostTab />
      <ShareModal />
      <Outlet />
    </Box>
  )
}

export default Layout
