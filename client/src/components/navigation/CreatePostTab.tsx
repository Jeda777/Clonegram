import { Button, Flex, FormControl, FormLabel, Image, Input, useColorModeValue } from '@chakra-ui/react'
import { useAppSelector } from '../../hooks/useReduxHooks'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import errorPopup from '../../hooks/useErrorPopup'
import { getBase64 } from '../../lib/getBase64'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const CreatePostTab = () => {
  const tabsState = useAppSelector((state) => state.tabs)
  const isOpen = tabsState.isOpen && tabsState.type === 'createPost'

  const leftClose = [0, null, '-100%']
  const leftOpen = [0, null, '208px', '224px', '272px', '336px']
  const topClose = ['-100%', null, 0]
  const topOpen = 0

  const useErrorPopup = errorPopup()
  const axiosPrivate = useAxiosPrivate()

  const resolver = z.object({
    image: z.string().includes('data:image/', { message: 'Image not set' }),
  })

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resolver),
    defaultValues: { image: '' },
  })

  useEffect(() => {
    if (errors.image) {
      useErrorPopup({ name: 'Image invalid', description: errors.image.message })
    }
  }, [errors])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]

    const base64File = (await getBase64(file)) as string
    setValue('image', base64File)
  }

  const onSubmit = async (data: z.infer<typeof resolver>) => {
    try {
      await axiosPrivate.post('/protected/posts/createPost', data)
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Flex
      flexDirection='column'
      background={useColorModeValue('white', 'gray.800')}
      zIndex={5}
      width={['100%', null, 'auto']}
      pt={[16, null, 14]}
      pb={14}
      px={7}
      position='fixed'
      left={isOpen ? leftOpen : leftClose}
      top={isOpen ? topOpen : topClose}
      height='100vh'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl display='flex' flexDirection='column' gap={4}>
          <FormLabel textAlign='center' fontSize='4xl'>
            Your Post
          </FormLabel>
          {watch('image') === '' ? (
            <>
              <Input
                borderColor={useColorModeValue('black', 'white')}
                mb={2}
                w='100%'
                type='file'
                accept='.png, .jpg, .jpeg'
                onChange={(e) => handleImageChange(e)}
              />
            </>
          ) : (
            <Image src={watch('image')} width='100%' aspectRatio='1' alt='Profile Picture' objectFit='cover' />
          )}
          <Button colorScheme='red' type='button' onClick={() => setValue('image', '')}>
            Remove Image
          </Button>
          <Button type='submit' isLoading={isSubmitting}>
            Post
          </Button>
        </FormControl>
      </form>
    </Flex>
  )
}

export default CreatePostTab
