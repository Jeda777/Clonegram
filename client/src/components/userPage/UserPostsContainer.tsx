import { Grid } from '@chakra-ui/react'
import { api_user_username_data_post } from '../../../types'
import UserPost from './UserPost'

interface props {
  posts: api_user_username_data_post[]
}

const UserPostsContainer = ({ posts }: props) => {
  return (
    <Grid templateColumns={['repeat(2, 1fr)', null, null, 'repeat(3, 1fr)']} gap={2}>
      {posts.map((p) => (
        <UserPost key={p.id} id={p.id} imageUrl={p.imageUrl} commentsCount={p.commentsCount} likesCount={p.likesCount} />
      ))}
    </Grid>
  )
}

export default UserPostsContainer
