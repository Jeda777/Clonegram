import { Button, Card, Flex, Image, Text } from '@chakra-ui/react'
import { api_notifications_user, notificationTypes } from '../../../types'

interface props {
  type: notificationTypes
  sender: api_notifications_user
}

const NotificationCard = ({ type, sender }: props) => {
  return (
    <Card variant='outline' flexDirection='row' p={3} maxWidth={96}>
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
              <Button size='xs' colorScheme='green' width='50%'>
                Accept
              </Button>
              <Button size='xs' colorScheme='red' width='50%'>
                Deny
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Card>
  )
}

export default NotificationCard
