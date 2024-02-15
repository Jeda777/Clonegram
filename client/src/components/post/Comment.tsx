import { Flex, Image, Text } from '@chakra-ui/react'
import { api_posts_data_comment } from '../../../types'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

interface props {
  comment: api_posts_data_comment
}

const Comment = ({ comment }: props) => {
  const navigate = useNavigate()

  return (
    <Flex flexDirection='column' gap={0.5}>
      <Flex
        alignItems='end'
        gap={2}
        width='min-content'
        onClick={() => navigate(`/user/${comment.user.username}`)}
        cursor='pointer'
      >
        <Image alt='Profile picture' src={comment.user.imageUrl} width={5} height={5} rounded='100%' />
        <Text fontWeight={600} fontSize='xs'>
          {comment.user.username}
        </Text>
        <Text fontSize='xs' whiteSpace='nowrap'>
          {moment(comment.createdAt).fromNow()}
        </Text>
      </Flex>
      <Text ml={7} fontSize='small'>
        {comment.content}
      </Text>
    </Flex>
  )
}

export default Comment
