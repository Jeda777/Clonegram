import { UseFormSetValue } from 'react-hook-form'
import { Box, IconButton, Image, useColorModeValue } from '@chakra-ui/react'
import { X } from 'lucide-react'

interface props {
  image: string
  setValue: UseFormSetValue<{
    image: string
    email: string
    username: string
    password: string
  }>
}

const ProfilePictureForm = ({ image, setValue }: props) => {
  return (
    <Box position='relative' mb={2} mx='auto'>
      <IconButton
        icon={<X color={useColorModeValue('black', 'white')} />}
        aria-label='Remove Image'
        isRound
        variant='ghost'
        _hover={{ background: 'red.500' }}
        _focus={{ background: 'red.500' }}
        _active={{ background: 'red.700' }}
        w={8}
        h={10}
        p={0}
        position='absolute'
        right='-10%'
        top='-10%'
        onClick={() => setValue('image', '')}
      />
      <Image src={image} boxSize={100} alt='Profile Picture' rounded='100%' fit='cover' />
    </Box>
  )
}

export default ProfilePictureForm
