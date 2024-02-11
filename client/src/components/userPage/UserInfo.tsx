import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { api_user_username_data_user } from '../../../types'

interface props {
  userInfo: api_user_username_data_user
  isFollowing: boolean
  isRequested: boolean
  isOwnUser: boolean
}

const UserInfo = ({ userInfo, isFollowing, isRequested, isOwnUser }: props) => {
  const handleMainButton = () => {
    if (isFollowing) {
      //TODO open unfollow modal
    } else if (isRequested) {
      //TODO undo request
    } else if (userInfo.private) {
      //TODO create follow request
    } else if (isOwnUser) {
      //TODO open edit modal
    } else {
      //TODO follow
    }
  }
  const handleConversation = () => {
    //TODO fetch for conversation id
  }

  return (
    <Flex gap={4} width={['90%']} pt={2} flexDirection='column'>
      <Flex gap={6} width='100%'>
        <Image alt='Profile picture' src={userInfo.imageUrl} width='20' height='20' rounded='100%' />
        <Flex justifyContent='space-around' alignItems='center' width='100%'>
          <Flex flexDirection='column' alignItems='center'>
            <Text fontWeight='600'>{userInfo.postsCount}</Text>
            <Text>Posts</Text>
          </Flex>
          <Flex flexDirection='column' alignItems='center'>
            <Text fontWeight='600'>{userInfo.followersCount}</Text>
            <Text>Followers</Text>
          </Flex>
          <Flex flexDirection='column' alignItems='center'>
            <Text fontWeight='600'>{userInfo.followingCount}</Text>
            <Text>Following</Text>
          </Flex>
        </Flex>
      </Flex>
      <Text fontWeight='700'>{userInfo.username}</Text>
      {userInfo.description !== null && <Text>{userInfo.description}</Text>}
      <Flex gap={2}>
        <Button width='50%' onClick={handleMainButton}>
          {isFollowing
            ? 'Following'
            : isRequested
            ? 'Follow requested'
            : userInfo.private
            ? 'Request follow'
            : isOwnUser
            ? 'Edit'
            : 'Follow'}
        </Button>
        <Button width='50%' onClick={handleConversation}>
          Conversation
        </Button>
      </Flex>
    </Flex>
  )
}

export default UserInfo
