import { Flex, Image, Text } from '@chakra-ui/react'
import { api_posts_data_comment } from '../../../types'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { memo } from 'react'

interface props {
  comment: api_posts_data_comment
}

const Comment = ({ comment }: props) => {
  const navigate = useNavigate()

  return (
    <Flex gap={2}>
      <Image alt='Profile picture' src={comment.user.imageUrl} width={7} height={7} rounded='100%' />
      <Flex flexDirection='column'>
        <Flex
          alignItems='end'
          gap={2}
          width='min-content'
          onClick={() => navigate(`/user/${comment.user.username}`)}
          cursor='pointer'
        >
          <Text fontWeight={600} fontSize='xs'>
            {comment.user.username}
          </Text>
          <Text fontSize='xs' whiteSpace='nowrap'>
            {moment(comment.createdAt).fromNow()}
          </Text>
        </Flex>
        <Text fontSize='small'>{comment.content}</Text>
      </Flex>
    </Flex>
  )
}

export default memo(Comment)
