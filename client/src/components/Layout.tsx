import { Box, Hide } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import MobileNavBottom from './navigation/mobile/MobileNavBottom'
import MobileNavTop from './navigation/mobile/MobileNavTop'
import SearchTab from './navigation/SearchTab'

const Layout = () => {
  return (
    <Box py={[14, null, 0]}>
      <Hide above='md'>
        <MobileNavTop />
        <MobileNavBottom />
      </Hide>
      <SearchTab />
      <Outlet />
    </Box>
  )
}

export default Layout
