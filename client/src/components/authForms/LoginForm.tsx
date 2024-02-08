import { Button, FormControl, FormLabel, Input, useColorModeValue } from '@chakra-ui/react'
import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import errorPopup from '../../lib/useErrorPopup'

const LoginForm = () => {
  const useErrorPopup = errorPopup()

  const resolver = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/), {
      message: 'Password must contain small letter, big letter, number, special sign and be between 8 and 24 characters long',
    }),
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm({
    resolver: zodResolver(resolver),
    defaultValues: { email: '', password: '' },
  })

  useEffect(() => {
    if (errors.email) {
      console.log(getValues('email'))
      useErrorPopup({ name: 'Email invalid', description: errors.email.message })
    }
    if (errors.password) {
      useErrorPopup({ name: 'Password invalid', description: errors.password.message })
    }
  }, [errors])

  const onSubmit = async (data: z.infer<typeof resolver>) => {
    const postData = { actionType: 'login', email: data.email, password: data.password }
    try {
      const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth`, postData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      console.log(result)
    } catch (e) {
      const error = e as AxiosError
      switch (error.response?.statusText) {
        case 'Missing data':
          useErrorPopup({ name: 'Missing data' })
          break
        case 'User with provided email not found':
          useErrorPopup({ name: `User with that email doesn't exist` })
          break
        case 'Invalid password':
          useErrorPopup({ name: 'Incorrect password' })
          break
        default:
          console.log(error)
          break
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl display='flex' flexDirection='column'>
        <FormLabel>Email</FormLabel>
        <Input borderColor={useColorModeValue('black', 'white')} mb={2} type='email' {...register('email')} />
        <FormLabel>Password</FormLabel>
        <Input borderColor={useColorModeValue('black', 'white')} mb={2} type='text' {...register('password')} />
        <Button type='submit' colorScheme='messenger' isLoading={isSubmitting}>
          Sign Up
        </Button>
      </FormControl>
    </form>
  )
}

export default LoginForm
