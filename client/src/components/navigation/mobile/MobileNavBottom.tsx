import { Flex, IconButton } from '@chakra-ui/react'
import { CircleUserRound, Home, ImagePlus, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

const MobileNavBottom = () => {
  const { auth } = useAuth()
  const navigate = useNavigate()

  return (
    <Flex width='100%' position='fixed' bottom={0} justifyContent='space-between' py={2} px={7}>
      <IconButton aria-label='Home' icon={<Home />} variant='ghost' isRound onClick={() => navigate('/')} />
      <IconButton aria-label='Search' icon={<Search />} variant='ghost' isRound />
      <IconButton aria-label='Add post' icon={<ImagePlus />} variant='ghost' isRound />
      <IconButton
        aria-label='User page'
        icon={<CircleUserRound />}
        variant='ghost'
        isRound
        onClick={() => navigate(`/user/${auth.username}`)}
      />
    </Flex>
  )
}

export default MobileNavBottom
