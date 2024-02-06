import { Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

const RegisterForm = () => {
  const toast = useToast()

  const resolver = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    username: z.string().regex(new RegExp(/^[A-z][A-z0-9-_]{3,23}$/), {
      message: 'Username can contain small and big letters, numbers and must be between 3 and 23 characters long',
    }),
    password: z.string().regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/), {
      message: 'Password must contain small letter, big letter, number, special sign and be between 8 and 24 characters long',
    }),
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resolver),
    defaultValues: { email: '', username: '', password: '' },
  })

  useEffect(() => {
    if (errors.email) {
      toast({
        title: 'Email invalid',
        description: errors.email.message,
        status: 'error',
        duration: 10000,
        isClosable: true,
      })
    }
    if (errors.username) {
      toast({
        title: 'Username invalid',
        description: errors.username.message,
        status: 'error',
        duration: 10000,
        isClosable: true,
      })
    }
    if (errors.password) {
      toast({
        title: 'Password invalid',
        description: errors.password.message,
        status: 'error',
        duration: 10000,
        isClosable: true,
      })
    }
  }, [errors])

  const onSubmit = async (data: z.infer<typeof resolver>) => {
    const postData = { actionType: 'login', email: data.email, password: data.password, username: data.username }
    console.log(postData)
    const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth`, postData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
    console.log(result)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl display='flex' flexDirection='column'>
        <FormLabel>Email</FormLabel>
        <Input mb={2} type='text' {...register('email')} />
        <FormLabel>Username</FormLabel>
        <Input mb={2} type='text' {...register('username')} />
        <FormLabel>Password</FormLabel>
        <Input mb={2} type='text' {...register('password')} />
        <Button type='submit' colorScheme='messenger' isLoading={isSubmitting}>
          Sign Up
        </Button>
      </FormControl>
    </form>
  )
}

export default RegisterForm
