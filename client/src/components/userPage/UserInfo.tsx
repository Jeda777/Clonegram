import { Button, Flex, Hide, Image, Show, Text, useDisclosure } from '@chakra-ui/react'
import { api_user_username_data_user } from '../../../types'
import EditUserModal from './EditUserModal'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'
import UnfollowModal from './UnfollowModal'
import { AxiosError } from 'axios'

interface props {
  userInfo: api_user_username_data_user
  isFollowing: boolean
  isRequested: boolean
  isOwnUser: boolean
}

const UserInfo = ({ userInfo, isFollowing, isRequested, isOwnUser }: props) => {
  const editModal = useDisclosure({ id: 'editModal' })
  const unfollowModal = useDisclosure({ id: 'unfollowModal' })
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  const handleMainButton = () => {
    if (isFollowing) {
      unfollowModal.onOpen()
    } else if (isOwnUser) {
      editModal.onOpen()
    } else if (isRequested) {
      handleAction('unrequest')
    } else if (userInfo.private) {
      handleAction('request')
    } else {
      handleAction('follow')
    }
  }

  const handleAction = async (type: 'request' | 'unrequest' | 'follow') => {
    try {
      type === 'request'
        ? await axiosPrivate.post(`/protected/followRequest/${userInfo.username}`)
        : type === 'unrequest'
        ? await axiosPrivate.delete(`/protected/unfollowRequest/${userInfo.username}`)
        : type === 'follow'
        ? await axiosPrivate.post(`/protected/follow/${userInfo.username}`)
        : console.log('Action not recognized')
      navigate(0)
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        navigate('/sign-in', { state: { from: location }, replace: true })
      } else {
        console.log(error)
      }
    }
  }

  const handleConversation = async () => {
    try {
      const result = await axiosPrivate('/protected/conversation/find', { params: { username: userInfo.username } })
      navigate(`/conversations/${result.data}`)
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        navigate('/sign-in', { state: { from: location }, replace: true })
      } else {
        console.log(error)
      }
    }
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
          fit='cover'
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
                  : isOwnUser
                  ? 'Edit Profile'
                  : isRequested
                  ? 'Follow requested'
                  : userInfo.private
                  ? 'Request follow'
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
                <Text fontWeight='600'>{userInfo._count.posts}</Text>
                <Text>Posts</Text>
              </Flex>
              <Flex flexDirection='column' alignItems='center'>
                <Text fontWeight='600'>{userInfo._count.followers}</Text>
                <Text>Followers</Text>
              </Flex>
              <Flex flexDirection='column' alignItems='center'>
                <Text fontWeight='600'>{userInfo._count.following}</Text>
                <Text>Following</Text>
              </Flex>
            </Hide>
            <Show above='lg'>
              <Flex gap={1} alignItems='center'>
                <Text>Posts:</Text>
                <Text fontWeight='600'>{userInfo._count.posts}</Text>
              </Flex>
              <Flex gap={1} alignItems='center'>
                <Text>Followers:</Text>
                <Text fontWeight='600'>{userInfo._count.followers}</Text>
              </Flex>
              <Flex gap={1} alignItems='center'>
                <Text>Following:</Text>
                <Text fontWeight='600'>{userInfo._count.following}</Text>
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
              : isOwnUser
              ? 'Edit Profile'
              : userInfo.private
              ? 'Request follow'
              : 'Follow'}
          </Button>
          {!isOwnUser && (
            <Button width='50%' onClick={handleConversation}>
              Conversation
            </Button>
          )}
        </Flex>
      </Hide>

      <EditUserModal
        description={userInfo.description}
        isPrivate={userInfo.private}
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
      />
      <UnfollowModal username={userInfo.username} isOpen={unfollowModal.isOpen} onClose={unfollowModal.onClose} />
    </Flex>
  )
}

export default UserInfo
