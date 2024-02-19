import { Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { useAppSelector } from '../../hooks/useReduxHooks'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { api_notifications_with_user } from '../../../types'
import NotificationCard from './NotificationCard'
import { AxiosError } from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import useErrorPopup from '../../hooks/useErrorPopup'

const NotificationsTab = () => {
  const tabsState = useAppSelector((state) => state.tabs)
  const isOpen = tabsState.isOpen && tabsState.type === 'notifications'
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  const errorPopup = useErrorPopup()

  const [notifications, setNotifications] = useState<api_notifications_with_user[] | null>(null)

  const leftClose = [0, null, '-100%']
  const leftOpen = [0, null, '208px', '224px', '272px', '336px']
  const topClose = ['-100%', null, 0]
  const topOpen = 0

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const result = await axiosPrivate.get('/protected/notifications')
        if ((result.data as api_notifications_with_user[]).length > 0) setNotifications(result.data)
      } catch (error) {
        const errorStatus = (error as AxiosError).response?.status as number
        if (errorStatus === 401) {
          navigate('/sign-in', { state: { from: location }, replace: true })
          errorPopup({ name: 'Session expired' })
        } else if (errorStatus === 404) {
          errorPopup({ name: 'Something went wrong' })
        } else {
          console.log(error)
        }
      }
    }

    if (isOpen) {
      getNotifications()
    }
  }, [isOpen])

  return (
    <Flex
      flexDirection='column'
      background={useColorModeValue('white', 'gray.800')}
      zIndex={5}
      width={['100%', null, '456px']}
      pt={[16, null, 14]}
      pb={14}
      px={7}
      gap={4}
      position='fixed'
      left={isOpen ? leftOpen : leftClose}
      top={isOpen ? topOpen : topClose}
      height='100vh'
      boxShadow={useColorModeValue('2xl', 'dark-lg')}
    >
      <Text fontSize='xl' textAlign={['center', null, 'left']} fontWeight='600' mr={[0, null, 16]}>
        Notifications
      </Text>
      <Flex flexDirection='column' gap={1} alignItems={['center', null, 'start']}>
        {notifications !== null &&
          notifications.map((n) => (
            <NotificationCard
              key={n.id}
              sender={n.fromUser}
              type={n.type}
              notificationId={n.id}
              setNotifications={setNotifications}
            />
          ))}
      </Flex>
    </Flex>
  )
}

export default NotificationsTab
