import {
  Button,
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

interface props {
  isOpen: boolean
  onClose: () => void
  description: string | null
}

const EditUserModal = ({ description, isOpen, onClose }: props) => {
  const resolver = z.object({
    description: z.string().nullable(),
  })

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(resolver),
    defaultValues: { description },
  })

  const onSubmit = async (data: z.infer<typeof resolver>) => {
    //TODO fetch api
  }

  const customOnClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={customOnClose}>
      <ModalOverlay />
      <ModalContent maxWidth='90%'>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
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
