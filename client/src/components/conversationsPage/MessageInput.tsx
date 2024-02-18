import { FormControl, IconButton, Input, useColorModeValue } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { AxiosError } from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useReduxHooks'

interface props {
  conversationId: string
}

const MessageInput = ({ conversationId }: props) => {
  const auth = useAppSelector((state) => state.auth)
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

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
      await axiosPrivate.post('/protected/conversation/messages/create', data, { params: { conversationId, senderId: auth.id } })
      reset()
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        navigate('/sign-in', { state: { from: location }, replace: true })
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
