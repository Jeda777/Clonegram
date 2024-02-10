import { Flex, IconButton, useColorModeValue } from '@chakra-ui/react'
import { CircleUserRound, Home, ImagePlus, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxHooks'
import { setTabClose, setTabOpen } from '../../../app/tabsSlice'

const MobileNavBottom = () => {
  const auth = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

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
      <IconButton aria-label='Search' icon={<Search />} variant='ghost' isRound onClick={() => dispatch(setTabOpen('search'))} />
      <IconButton aria-label='Add post' icon={<ImagePlus />} variant='ghost' isRound onClick={() => dispatch(setTabClose())} />
      <IconButton
        aria-label='User page'
        icon={<CircleUserRound />}
        variant='ghost'
        isRound
        onClick={() => {
          dispatch(setTabClose())
          navigate(`/user/${auth.username}`)
        }}
      />
    </Flex>
  )
}

export default MobileNavBottom
