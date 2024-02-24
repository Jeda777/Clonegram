import { api_user_saved_data } from '../../../types'
import { Flex } from '@chakra-ui/react'
import UserPost from './UserPost'

interface props {
  saves: api_user_saved_data[]
}

const SavedContainer = ({ saves }: props) => {
  return (
    <Flex
      maxWidth={[null, null, '488px', '568px', '856px']}
      width='90%'
      justifyContent={['center', null, 'start']}
      flexWrap='wrap'
      gap={[4, null, 2]}
    >
      {saves.map((s) => (
        <UserPost
          key={s.id}
          id={s.post.id}
          imageUrl={s.post.imageUrl}
          commentsCount={s.post._count.comments}
          likesCount={s.post._count.likes}
        />
      ))}
    </Flex>
  )
}

export default SavedContainer
