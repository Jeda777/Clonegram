import { Center, Heading, FormControl, FormLabel, Input, Flex, Button } from '@chakra-ui/react'
import { useState } from 'react'

const SignIn = () => {
  const [register, setRegister] = useState(false)

  return (
    <Center w='100vw' h='100vh'>
      <Flex flexDirection='column' gap={4} p={4} border='1px' borderColor='black' rounded={16}>
        <Heading alignSelf='center'>Clonegram</Heading>
        <FormControl display='flex' flexDirection='column'>
          <FormLabel>Email</FormLabel>
          <Input mb={2} type='text' />
          {register && (
            <>
              <FormLabel>Username</FormLabel>
              <Input mb={2} type='text' />
            </>
          )}
          <FormLabel>Password</FormLabel>
          <Input mb={2} type='text' />
          <Button type='submit' colorScheme='messenger'>
            {register ? 'Sign Up' : 'Sign In'}
          </Button>
        </FormControl>
        <Button
          type='submit'
          variant='link'
          textColor='text.secondary'
          onClick={() => {
            setRegister((p) => !p)
          }}
        >
          {register ? 'Already Signed up?' : `Don't have an account?`}
        </Button>
      </Flex>
    </Center>
  )
}

export default SignIn
