import { Center, Heading, Flex, Button, Box, useColorModeValue, Checkbox } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import RegisterForm from '../components/authForms/RegisterForm'
import LoginForm from '../components/authForms/LoginForm'
import ThemeButton from '../components/ThemeButton'
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks'
import { setPersist } from '../app/authSlice'

const SignInPage = () => {
  const [SignUp, setSignUp] = useState(false)
  const persist = useAppSelector((state) => state.auth.persist)
  const dispatch = useAppDispatch()

  const handlePersist = () => {
    dispatch(setPersist(!persist))
  }

  useEffect(() => {
    localStorage.setItem('persist', String(persist))
  }, [persist])

  return (
    <Center w='100vw' h='100vh'>
      <Box>
        <ThemeButton />
      </Box>
      <Flex flexDirection='column' gap={4} p={4} border='1px' borderColor={useColorModeValue('black', 'white')} rounded={16}>
        <Heading alignSelf='center'>Clonegram</Heading>
        {SignUp ? <RegisterForm /> : <LoginForm />}
        <Checkbox colorScheme='messenger' defaultChecked={persist} onChange={handlePersist}>
          Trust this device
        </Checkbox>
        <Button
          type='submit'
          variant='link'
          textColor='text.secondary'
          onClick={() => {
            setSignUp((p) => !p)
          }}
        >
          {SignUp ? 'Already Signed up?' : `Don't have an account?`}
        </Button>
      </Flex>
    </Center>
  )
}

export default SignInPage
