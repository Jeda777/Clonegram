import { Flex, GridItem, Image } from '@chakra-ui/react'
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
    <GridItem position='relative' onClick={() => navigate(`/post/${id}`)}>
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
      <Image aspectRatio={1} height='60' objectFit='cover' alt='User post' src={imageUrl} />
    </GridItem>
  )
}

export default UserPost
