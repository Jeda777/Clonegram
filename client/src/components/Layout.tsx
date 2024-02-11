import { Box, Hide, Show } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import MobileNavBottom from './navigation/mobile/MobileNavBottom'
import MobileNavTop from './navigation/mobile/MobileNavTop'
import SearchTab from './navigation/SearchTab'
import DesktopNavLeft from './navigation/desktop/DesktopNavLeft'

const Layout = () => {
  return (
    <Box py={[14, null, 0]}>
      <Hide above='md'>
        <MobileNavTop />
        <MobileNavBottom />
      </Hide>
      <Show above='md'>
        <DesktopNavLeft />
      </Show>
      <SearchTab />
      <Outlet />
    </Box>
  )
}

export default Layout
