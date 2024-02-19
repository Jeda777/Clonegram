import { Button, Card, Flex, IconButton, Image, Text } from '@chakra-ui/react'
import { api_notifications_user, api_notifications_with_user, notificationTypes } from '../../../types'
import { X } from 'lucide-react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { Dispatch, SetStateAction } from 'react'
import { AxiosError } from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import useErrorPopup from '../../hooks/useErrorPopup'

interface props {
  type: notificationTypes
  sender: api_notifications_user
  notificationId: string
  setNotifications: Dispatch<SetStateAction<api_notifications_with_user[] | null>>
}

const NotificationCard = ({ type, sender, notificationId, setNotifications }: props) => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  const errorPopup = useErrorPopup()

  const removeNotificationFromState = () => {
    setNotifications((state) => {
      if (state === null) return null
      const newState = state.filter((n) => n.id !== notificationId)
      return newState
    })
  }

  const handleAction = async (type: 'remove' | 'accept' | 'deny') => {
    try {
      type === 'remove'
        ? await axiosPrivate.delete(`/protected/notifications/${notificationId}`)
        : type === 'accept'
        ? await axiosPrivate.post(`/protected/notifications/accept/${notificationId}`)
        : type === 'deny'
        ? await axiosPrivate.delete(`/protected/notifications/deny/${notificationId}`)
        : console.log('Acton not recognized')
      removeNotificationFromState()
    } catch (error) {
      const errorStatus = (error as AxiosError).response?.status as number
      if (errorStatus === 401) {
        navigate('/sign-in', { state: { from: location }, replace: true })
        errorPopup({ name: 'Session expired' })
      } else if ([403, 404].includes(errorStatus)) {
        errorPopup({ name: 'Something went wrong' })
      } else {
        console.log(error)
      }
    }
  }

  return (
    <Card variant='outline' flexDirection='row' p={3} width='100%' position='relative'>
      <Flex gap={2} width='100%' alignItems='center'>
        <Image width={12} height={12} alt='Profile picture' src={sender.imageUrl} rounded='100%' />
        <Flex flexDirection='column' width='100%' gap={2}>
          <Text>
            {sender.username}{' '}
            {type === 'Comment'
              ? 'commented your post'
              : type === 'Follow'
              ? 'followed you'
              : type === 'FollowRequest'
              ? 'requested to follow you'
              : type === 'Like'
              ? 'liked your post'
              : ''}
          </Text>
          {type === 'FollowRequest' && (
            <Flex gap={4}>
              <Button size='xs' colorScheme='green' width='50%' onClick={() => handleAction('accept')}>
                Accept
              </Button>
              <Button size='xs' colorScheme='red' width='50%' onClick={() => handleAction('deny')}>
                Deny
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
      {type !== 'FollowRequest' && (
        <IconButton
          aria-label='Delete notification'
          icon={<X width={16} height={16} />}
          variant='ghost'
          position='absolute'
          width={5}
          minWidth={0}
          height={5}
          rounded='0.25rem'
          p={0}
          right={0}
          top={0}
          onClick={() => handleAction('remove')}
        />
      )}
    </Card>
  )
}

export default NotificationCard
