import { Flex, IconButton, useColorModeValue } from '@chakra-ui/react'
import { Bookmark, Image } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface props {
  value: 'posts' | 'saved'
  setValue: Dispatch<SetStateAction<'posts' | 'saved'>>
}

const ViewToggle = ({ value, setValue }: props) => {
  const handleClick = (type: 'posts' | 'saved') => {
    if (type === 'posts' && value === 'saved') setValue('posts')
    else if (type === 'saved' && value === 'posts') setValue('saved')
  }

  const activeColor = useColorModeValue('#1A202C', '#ffffffeb')

  return (
    <Flex width='90%' maxWidth='600px' justifyContent='space-around'>
      <IconButton
        variant='ghost'
        aria-label='Posts tab'
        icon={<Image size={40} color={value === 'posts' ? activeColor : 'gray'} />}
        onClick={() => handleClick('posts')}
      />
      <IconButton
        variant='ghost'
        aria-label='Saved tab'
        icon={<Bookmark size={40} color={value === 'saved' ? activeColor : 'gray'} />}
        onClick={() => handleClick('saved')}
      />
    </Flex>
  )
}

export default ViewToggle
