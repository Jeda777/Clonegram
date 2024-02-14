import { Flex } from '@chakra-ui/react'
import { api_user_username_data_post } from '../../../types'
import UserPost from './UserPost'

interface props {
  posts: api_user_username_data_post[]
}

const UserPostsContainer = ({ posts }: props) => {
  return (
    <Flex maxWidth='846px' width='90%' justifyContent={['center', null, null, 'start']} flexWrap='wrap' gap={[4, null, 2]}>
      {posts.map((p) => (
        <UserPost key={p.id} id={p.id} imageUrl={p.imageUrl} commentsCount={p._count.comments} likesCount={p._count.likes} />
      ))}
    </Flex>
  )
}

export default UserPostsContainer
