import { Box, Flex, Image } from '@chakra-ui/react'
import { Heart, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface props {
  imageUrl: string
  id: string
  commentsCount: number
  likesCount: number
}

const UserPost = ({ imageUrl, id, commentsCount, likesCount }: props) => {
  const navigate = useNavigate()

  return (
    <Box
      width='100%'
      maxWidth={['none', null, '240px', '280px']}
      aspectRatio={1}
      position='relative'
      onClick={() => navigate(`/post/${id}`)}
      cursor='pointer'
    >
      <Flex
        position='absolute'
        justifyContent='center'
        alignItems='center'
        gap={4}
        width='100%'
        height='100%'
        background='blackAlpha.600'
        opacity={0}
        _hover={{ opacity: 100 }}
      >
        <Flex color='white' alignItems='center' gap={1}>
          <Heart />
          {likesCount}
        </Flex>
        <Flex color='white' alignItems='center' gap={1}>
          <MessageCircle />
          {commentsCount}
        </Flex>
      </Flex>
      <Image aspectRatio={1} objectFit='cover' alt='User post' src={imageUrl} width='100%' />
    </Box>
  )
}

export default UserPost
