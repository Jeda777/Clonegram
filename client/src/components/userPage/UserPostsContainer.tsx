import { Flex, Text } from '@chakra-ui/react'
import { api_user_username_data_post } from '../../../types'

interface props {
  posts: api_user_username_data_post[]
}

const UserPostsContainer = ({ posts }: props) => {
  return (
    <Flex>
      {posts.map((p) => (
        <Text>{p.id}</Text>
      ))}
    </Flex>
  )
}

export default UserPostsContainer
