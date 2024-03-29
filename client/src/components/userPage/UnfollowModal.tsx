import { Button, Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import useErrorPopup from '../../hooks/useErrorPopup'

interface props {
  isOpen: boolean
  onClose: () => void
  username: string
  getUser: () => Promise<(() => void) | undefined>
}

const UnfollowModal = ({ username, isOpen, onClose, getUser }: props) => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  const errorPopup = useErrorPopup()
  let isSubmitting = false

  const handleSubmit = async () => {
    try {
      isSubmitting = true
      await axiosPrivate.delete(`/protected/unfollow/${username}`)
      isSubmitting = false
      getUser()
      onClose()
    } catch (error) {
      const errorStatus = (error as AxiosError).response?.status as number
      if (errorStatus === 401) {
        navigate('/sign-in', { state: { from: location }, replace: true })
        errorPopup({ name: 'Session expired' })
        isSubmitting = false
      } else if (errorStatus === 404) {
        errorPopup({ name: 'Something went wrong' })
        isSubmitting = false
      } else {
        console.log(error)
        isSubmitting = false
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth='500px' width='90%' ml={[0, null, '208px', '224px', '272px', '336px']}>
        <ModalHeader>Are you sure you want to unfollow ${username}?</ModalHeader>
        <ModalFooter gap={4}>
          <Button onClick={onClose} colorScheme='red' width='50%'>
            Close
          </Button>
          <Button colorScheme='green' width='50%' type='submit' isLoading={isSubmitting} onClick={handleSubmit}>
            Unfollow
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UnfollowModal
