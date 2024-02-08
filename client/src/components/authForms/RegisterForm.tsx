import { Button, FormControl, FormLabel, Input, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { getBase64 } from '../../lib/getBase64'
import ProfilePictureForm from './ProfilePictureForm'
import errorPopup from '../../lib/useErrorPopup'
import { authObject } from '../../../types'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const RegisterForm = () => {
  const useErrorPopup = errorPopup()
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const resolver = z.object({
    image: z.string().includes('data:image/', { message: 'Image not set' }),
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
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resolver),
    defaultValues: { image: '', email: '', username: '', password: '' },
  })

  useEffect(() => {
    if (errors.image) {
      useErrorPopup({ name: 'Image invalid', description: errors.image.message })
    }
    if (errors.email) {
      useErrorPopup({ name: 'Email invalid', description: errors.email.message })
    }
    if (errors.username) {
      useErrorPopup({ name: 'Username invalid', description: errors.username.message })
    }
    if (errors.password) {
      useErrorPopup({ name: 'Password invalid', description: errors.password.message })
    }
  }, [errors])

  const onSubmit = async (data: z.infer<typeof resolver>) => {
    const postData = {
      actionType: 'register',
      image: data.image,
      email: data.email,
      password: data.password,
      username: data.username,
    }
    try {
      const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth`, postData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      const data = result.data as authObject
      setAuth({
        accessToken: data.accessToken,
        email: data.email,
        id: data.id,
        imageUrl: data.imageUrl,
        username: data.username,
      })
      reset()
      return navigate('/')
    } catch (e) {
      const error = e as AxiosError
      switch (error.response?.statusText) {
        case 'Username in use':
          useErrorPopup({ name: 'Username in use' })
          break
        case 'Email in use':
          useErrorPopup({ name: 'Email in use' })
          break
        case 'Missing data':
          useErrorPopup({ name: 'Missing data' })
          break
        default:
          console.log(error)
          break
      }
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]

    const base64File = (await getBase64(file)) as string
    setValue('image', base64File)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl display='flex' flexDirection='column'>
        {watch('image') === '' ? (
          <>
            <FormLabel>Profile picture</FormLabel>
            <Input
              borderColor={useColorModeValue('black', 'white')}
              mb={2}
              w={215}
              type='file'
              accept='.png, .jpg, .jpeg'
              onChange={(e) => handleImageChange(e)}
            />
          </>
        ) : (
          <ProfilePictureForm image={watch('image')} setValue={setValue} />
        )}
        <FormLabel>Email</FormLabel>
        <Input borderColor={useColorModeValue('black', 'white')} mb={2} type='text' {...register('email')} />
        <FormLabel>Username</FormLabel>
        <Input borderColor={useColorModeValue('black', 'white')} mb={2} type='text' {...register('username')} />
        <FormLabel>Password</FormLabel>
        <Input borderColor={useColorModeValue('black', 'white')} mb={2} type='text' {...register('password')} />
        <Button type='submit' colorScheme='messenger' isLoading={isSubmitting}>
          Sign Up
        </Button>
      </FormControl>
    </form>
  )
}

export default RegisterForm
