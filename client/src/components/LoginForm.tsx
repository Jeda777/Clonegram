import { Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import { useRef, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null)

  const toast = useToast()

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
  } = useForm({
    resolver: zodResolver(resolver),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = () => {}

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

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus()
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl display='flex' flexDirection='column'>
        <FormLabel>Email</FormLabel>
        <Input mb={2} type='text' {...register('email')} ref={emailRef} />
        <FormLabel>Password</FormLabel>
        <Input mb={2} type='text' {...register('password')} />
        <Button type='submit' colorScheme='messenger'>
          Sign Up
        </Button>
      </FormControl>
    </form>
  )
}

export default LoginForm
