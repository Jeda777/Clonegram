import { Flex, FormControl, IconButton, Input, useColorModeValue } from '@chakra-ui/react'
import { api_posts_data_comment } from '../../../types'
import NoComments from './NoComments'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Comment from './Comment'

interface props {
  comments: api_posts_data_comment[] | []
  postId: string
}

const CommentsContainer = ({ comments, postId }: props) => {
  const [commentsData, setCommentsData] = useState<api_posts_data_comment[] | []>(comments)
  const navigate = useNavigate()
  const location = useLocation()
  const axiosPrivate = useAxiosPrivate()

  const resolver = z.object({
    comment: z.string().min(1),
  })

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(resolver),
    defaultValues: { comment: '' },
  })

  const onSubmit = async (data: z.infer<typeof resolver>) => {
    try {
      const result = await axiosPrivate.post(`/protected/posts/${postId}/comment`, data)
      setCommentsData((prev) => [result.data, ...prev])
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
    <Flex flexDirection='column'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl display='flex'>
          <Input
            borderColor={useColorModeValue('black', 'white')}
            mb={2}
            type='text'
            {...register('comment')}
            placeholder='Write a comment'
          />
          <IconButton type='submit' aria-label='Send comment' icon={<Send />} ml={1} isLoading={isSubmitting} />
        </FormControl>
      </form>
      {commentsData.length === 0 ? (
        <NoComments />
      ) : (
        <Flex
          flexDirection='column'
          mt={2}
          gap={3}
          overflow={[null, null, null, null, 'scroll']}
          maxHeight={[null, null, null, null, '444px']}
        >
          {commentsData.map((c) => (
            <Comment key={c.id} comment={c} />
          ))}
        </Flex>
      )}
    </Flex>
  )
}

export default CommentsContainer
