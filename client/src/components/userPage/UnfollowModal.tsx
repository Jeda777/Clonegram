import { Button, Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

interface props {
  isOpen: boolean
  onClose: () => void
  username: string
}

const UnfollowModal = ({ username, isOpen, onClose }: props) => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  let isSubmitting = false

  const handleSubmit = async () => {
    try {
      isSubmitting = true
      await axiosPrivate.delete(`/protected/unfollow/${username}`)
      navigate(0)
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        navigate('/sign-in', { state: { from: location }, replace: true })
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
