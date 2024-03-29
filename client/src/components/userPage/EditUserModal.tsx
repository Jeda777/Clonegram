import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import useErrorPopup from '../../hooks/useErrorPopup'

interface props {
  isOpen: boolean
  onClose: () => void
  description: string | null
  isPrivate: boolean
  getUser: () => Promise<(() => void) | undefined>
}

const EditUserModal = ({ description, isPrivate, isOpen, onClose, getUser }: props) => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  const errorPopup = useErrorPopup()

  const resolver = z.object({
    description: z.string().nullable(),
    isPrivate: z.boolean(),
  })

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(resolver),
    defaultValues: { description, isPrivate },
  })

  const onSubmit = async (data: z.infer<typeof resolver>) => {
    try {
      await axiosPrivate.patch('/protected/user', data)
      reset()
      customOnClose()
      getUser()
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

  const customOnClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={customOnClose}>
      <ModalOverlay />
      <ModalContent maxWidth='500px' width='90%' ml={[0, null, '208px', '224px', '272px', '336px']}>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Private Profile</FormLabel>
              <Checkbox {...register('isPrivate')} />
              <FormLabel>Description</FormLabel>
              <Textarea {...register('description')} />
            </FormControl>
            <Flex gap={4} mt={4}>
              <Button onClick={customOnClose} colorScheme='red' width='50%'>
                Close
              </Button>
              <Button colorScheme='green' width='50%' type='submit' isLoading={isSubmitting}>
                Change
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default EditUserModal
