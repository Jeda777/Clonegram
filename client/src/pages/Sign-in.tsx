import { Center, Heading, Flex, Button, Box, useColorModeValue } from '@chakra-ui/react'
import { useState } from 'react'
import RegisterForm from '../components/authForms/RegisterForm'
import LoginForm from '../components/authForms/LoginForm'
import ThemeButton from '../components/ThemeButton'

const SignIn = () => {
  const [SignUp, setSignUp] = useState(false)

  return (
    <Center w='100vw' h='100vh'>
      <Box>
        <ThemeButton />
      </Box>
      <Flex flexDirection='column' gap={4} p={4} border='1px' borderColor={useColorModeValue('black', 'white')} rounded={16}>
        <Heading alignSelf='center'>Clonegram</Heading>
        {SignUp ? <RegisterForm /> : <LoginForm />}
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

export default SignIn