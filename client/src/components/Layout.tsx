import { Box, Hide } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import MobileNavBottom from './navigation/mobile/MobileNavBottom'
import MobileNavTop from './navigation/mobile/MobileNavTop'

const Layout = () => {
  return (
    <Box py={[14, null, 0]}>
      <Hide above='md'>
        <MobileNavTop />
        <MobileNavBottom />
      </Hide>
      <Outlet />
    </Box>
  )
}

export default Layout
