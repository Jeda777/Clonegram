import { api_posts_data_post } from '../../../types'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks'
import { Card, Flex, IconButton, Image, Text } from '@chakra-ui/react'
import moment from 'moment'
import LikeButton from '../LikeButton'
import { MessageCircle, Share, Trash2 } from 'lucide-react'
import CommentsContainer from './CommentsContainer'
import { setShareModalOpen } from '../../app/shareModalSlice'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { AxiosError } from 'axios'
import useErrorPopup from '../../hooks/useErrorPopup'

interface props {
  post: api_posts_data_post
}

const Post = ({ post }: props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const axiosPrivate = useAxiosPrivate()
  const errorPopup = useErrorPopup()

  const like = post.likes.find((l) => l.userId === auth.id)
  const isLiked = like !== undefined
  const isOwner = post.userId === auth.id

  const handleDelete = async () => {
    try {
      await axiosPrivate.delete(`/protected/posts/deletePost/${post.id}`)
      navigate('/')
    } catch (error) {
      const errorStatus = (error as AxiosError).response?.status as number
      if (errorStatus === 401) {
        navigate('/sign-in', { state: { from: location }, replace: true })
        errorPopup({ name: 'Session expired' })
      } else if (errorStatus === 404) {
        errorPopup({ name: 'Something went wrong' })
      } else {
        console.log(error)
      }
    }
  }

  return (
    <Card
      width='100%'
      maxHeight={[null, null, null, null, '600px']}
      flexDirection={['column', null, null, null, 'row']}
      gap={2}
      pb={[2, null, null, null, 0]}
      overflow='hidden'
    >
      <Image
        width='100%'
        maxWidth={[null, null, null, null, '600px']}
        aspectRatio={1}
        alt='Post image'
        src={post.imageUrl}
        objectFit='cover'
        cursor='pointer'
        onClick={() => navigate(`/post/${post.id}`)}
      />
      <Flex flexDirection='column' gap={2.5} px={2} py={[0, null, null, null, 2]}>
        <Flex
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
        <Flex justifyContent='space-around'>
          <LikeButton isLiked={isLiked} likeCount={post._count.likes} postId={post.id} />
          <Flex gap={1}>
            <MessageCircle />
            <Text>{post._count.comments}</Text>
          </Flex>
          <IconButton
            aria-label='Share'
            icon={<Share />}
            isRound
            p={0}
            variant='ghost'
            minWidth={0}
            height='auto'
            _hover={{ background: 'none' }}
            onClick={() => dispatch(setShareModalOpen({ isOpen: true, postId: post.id }))}
          />
        </Flex>
        <CommentsContainer comments={post.comments} postId={post.id} />
        {isOwner && (
          <IconButton
            aria-label='Delete post'
            icon={<Trash2 />}
            colorScheme='red'
            alignSelf='end'
            mt='auto'
            onClick={handleDelete}
          />
        )}
      </Flex>
    </Card>
  )
}

export default Post
