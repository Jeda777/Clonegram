import { FormControl, IconButton, Input, useColorModeValue } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { AxiosError } from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import useErrorPopup from '../../hooks/useErrorPopup'

interface props {
  conversationId: string
}

const MessageInput = ({ conversationId }: props) => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  const errorPopup = useErrorPopup()

  const resolver = z.object({
    content: z.string().min(1),
  })

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(resolver),
    defaultValues: { content: '' },
  })

  const onSubmit = async (data: z.infer<typeof resolver>) => {
    try {
      await axiosPrivate.post(`/protected/conversation/${conversationId}/messages/create`, data)
      reset()
    } catch (error) {
      const errorStatus = (error as AxiosError).response?.status as number
      if (errorStatus === 401) {
        navigate('/sign-in', { state: { from: location }, replace: true })
        errorPopup({ name: 'Session expired' })
      } else if ([400, 400].includes(errorStatus)) {
        errorPopup({ name: 'Something went wrong' })
      } else {
        console.log(error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl display='flex'>
        <Input borderColor={useColorModeValue('black', 'white')} type='text' {...register('content')} />
        <IconButton type='submit' aria-label='Send' icon={<Send />} isLoading={isSubmitting} />
      </FormControl>
    </form>
  )
}

export default MessageInput
