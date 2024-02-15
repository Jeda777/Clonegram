import { Flex, FormControl, IconButton, Input, useColorModeValue } from '@chakra-ui/react'
import { api_posts_data_comment } from '../../../types'
import NoComments from './NoComments'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useState } from 'react'

interface props {
  comments: api_posts_data_comment[] | []
}

const CommentsContainer = ({ comments }: props) => {
  const [commentsData, setCommentsData] = useState<api_posts_data_comment[] | []>(comments)

  const resolver = z.object({
    comment: z.string().min(1),
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(resolver),
    defaultValues: { comment: '' },
  })

  const onSubmit = async (data: z.infer<typeof resolver>) => {
    //TODO create comment
  }

  return (
    <Flex flexDirection='column'>
      {commentsData.length === 0 && <NoComments />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl display='flex'>
          <Input
            borderColor={useColorModeValue('black', 'white')}
            mb={2}
            type='text'
            {...register('comment')}
            placeholder='Write a comment'
          />
          <IconButton aria-label='Send comment' icon={<Send />} ml={1} isLoading={isSubmitting} />
        </FormControl>
      </form>
    </Flex>
  )
}

export default CommentsContainer
