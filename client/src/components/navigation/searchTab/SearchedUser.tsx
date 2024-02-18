import { Card, CardBody, Image, Text } from '@chakra-ui/react'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/useReduxHooks'
import { setTabClose } from '../../../app/tabsSlice'

interface props {
  username: string
  imageUrl: string
}

const SearchedUser = ({ username, imageUrl }: props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleClick = () => {
    navigate(`/user/${username}`)
    dispatch(setTabClose())
  }
  const handleKey = (e: any) => {
    const key = (e as KeyboardEvent).key
    if (key === 'Enter') {
      navigate(`/user/${username}`)
      dispatch(setTabClose())
    }
  }

  return (
    <Card width='100%' onClick={handleClick} onKeyDown={(e) => handleKey(e)} role='button' aria-pressed='false' tabIndex={0}>
      <CardBody display='flex' gap={2} alignItems='center' p={4}>
        <Image alt='Profile picture' src={imageUrl} aspectRatio={1} width={10} rounded='100%' />
        <Text fontWeight='600' fontSize='lg'>
          {username}
        </Text>
      </CardBody>
    </Card>
  )
}

export default memo(SearchedUser)
