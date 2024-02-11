import { Button, Flex, Hide, Image, Show, Text, useDisclosure } from '@chakra-ui/react'
import { api_user_username_data_user } from '../../../types'
import EditUserModal from './EditUserModal'

interface props {
  userInfo: api_user_username_data_user
  isFollowing: boolean
  isRequested: boolean
  isOwnUser: boolean
}

const UserInfo = ({ userInfo, isFollowing, isRequested, isOwnUser }: props) => {
  const editModal = useDisclosure({ id: 'editModal' })

  const handleMainButton = () => {
    if (isFollowing) {
      //TODO open unfollow modal
    } else if (isRequested) {
      //TODO undo request
    } else if (userInfo.private) {
      //TODO create follow request
    } else if (isOwnUser) {
      editModal.onOpen()
    } else {
      //TODO follow
    }
  }
  const handleConversation = () => {
    //TODO fetch for conversation id
  }

  return (
    <Flex gap={4} width={['90%', null, null, 'auto']} pt={[2, null, 16]} flexDirection='column'>
      <Flex gap={[6, null, null, 10]} width={['100%', null, null, 'auto']}>
        <Image
          alt='Profile picture'
          src={userInfo.imageUrl}
          width={['20', null, null, '28']}
          height={['20', null, null, '28']}
          rounded='100%'
        />
        <Flex width={['100%', null, null, 'auto']} flexDirection='column' py={[4, null, null, 0]} gap={2}>
          <Show above='lg'>
            <Flex gap={4} alignItems='center'>
              <Text fontWeight='700' fontSize='lg'>
                {userInfo.username}
              </Text>
              <Button width='40' onClick={handleMainButton}>
                {isFollowing
                  ? 'Following'
                  : isRequested
                  ? 'Follow requested'
                  : userInfo.private
                  ? 'Request follow'
                  : isOwnUser
                  ? 'Edit Profile'
                  : 'Follow'}
              </Button>
              {!isOwnUser && (
                <Button width='40' onClick={handleConversation}>
                  Conversation
                </Button>
              )}
            </Flex>
          </Show>
          <Flex
            justifyContent={['space-around', 'space-evenly', 'space-around', 'start']}
            alignItems='center'
            gap={[0, null, null, 4]}
            width={['100%', null, null, 'auto']}
          >
            <Hide above='lg'>
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
            </Hide>
            <Show above='lg'>
              <Flex gap={1} alignItems='center'>
                <Text>Posts:</Text>
                <Text fontWeight='600'>{userInfo.postsCount}</Text>
              </Flex>
              <Flex gap={1} alignItems='center'>
                <Text>Followers:</Text>
                <Text fontWeight='600'>{userInfo.followersCount}</Text>
              </Flex>
              <Flex gap={1} alignItems='center'>
                <Text>Following:</Text>
                <Text fontWeight='600'>{userInfo.followingCount}</Text>
              </Flex>
            </Show>
          </Flex>
          <Show above='lg'>{userInfo.description !== null && <Text>{userInfo.description}</Text>}</Show>
        </Flex>
      </Flex>
      <Hide above='lg'>
        <Text fontWeight='700'>{userInfo.username}</Text>
      </Hide>
      <Hide above='lg'>
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
              ? 'Edit Profile'
              : 'Follow'}
          </Button>
          {!isOwnUser && (
            <Button width='50%' onClick={handleConversation}>
              Conversation
            </Button>
          )}
        </Flex>
      </Hide>

      <EditUserModal description={userInfo.description} isOpen={editModal.isOpen} onClose={editModal.onClose} />
    </Flex>
  )
}

export default UserInfo
