import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'

const LoginForm = () => {
  return (
    <form>
      <FormControl display='flex' flexDirection='column'>
        <FormLabel>Email</FormLabel>
        <Input mb={2} type='text' />
        <FormLabel>Password</FormLabel>
        <Input mb={2} type='text' />
        <Button type='submit' colorScheme='messenger'>
          Sign Up
        </Button>
      </FormControl>
    </form>
  )
}

export default LoginForm
