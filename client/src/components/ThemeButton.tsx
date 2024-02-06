import { IconButton, useColorMode } from '@chakra-ui/react'
import { Sun, Moon } from 'lucide-react'

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      icon={colorMode === 'dark' ? <Sun height={32} width={32} /> : <Moon height={32} width={32} />}
      aria-label='Theme Switch'
      isRound
      onClick={() => toggleColorMode()}
      variant='ghost'
      w={8}
      h={10}
      p={0}
      position='absolute'
      right='2%'
      top='2%'
    />
  )
}

export default ThemeButton
