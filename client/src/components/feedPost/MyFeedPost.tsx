import { Card, Flex, IconButton, Image, Text } from '@chakra-ui/react'
import { api_myFeed_data_post } from '../../../types'
import { MessageCircle, Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useReduxHooks'
import moment from 'moment'
import LikeButton from '../LikeButton'
import { memo } from 'react'

interface props {
  post: api_myFeed_data_post
}

const MyFeedPost = ({ post }: props) => {
  const navigate = useNavigate()
  const auth = useAppSelector((state) => state.auth)

  const like = post.likes.find((l) => l.userId === auth.id)
  const isLiked = like !== undefined

  const handleShare = () => {
    //TODO open share modal
  }

  return (
    <Card width='100%' maxWidth='600px' flexDirection='column' gap={2} py={2}>
      <Flex
        px={2}
        alignItems='center'
        gap={2}
        width='min-content'
        onClick={() => navigate(`/user/${post.user.username}`)}
        cursor='pointer'
      >
        <Image alt='Profile picture' src={post.user.imageUrl} width={10} height={10} rounded='100%' />
        <Text fontWeight={600}>{post.user.username}</Text>
        <Text fontSize='sm' whiteSpace='nowrap'>
          {moment(post.createdAt).fromNow()}
        </Text>
      </Flex>
      <Image
        width='100%'
        aspectRatio={1}
        alt='Post image'
        src={post.imageUrl}
        objectFit='cover'
        cursor='pointer'
        onClick={() => navigate(`/post/${post.id}`)}
      />
      <Flex justifyContent='space-around'>
        <LikeButton isLiked={isLiked} likeCount={post._count.likes} postId={post.id} />
        <Flex gap={1}>
          <MessageCircle />
          <Text>{post._count.comments}</Text>
        </Flex>
        <IconButton
          aria-label='Share'
          icon={<Send />}
          isRound
          p={0}
          variant='ghost'
          minWidth={0}
          height='auto'
          _hover={{ background: 'none' }}
          onClick={handleShare}
        />
      </Flex>
    </Card>
  )
}

export default memo(MyFeedPost)
