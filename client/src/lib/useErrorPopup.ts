import { useToast } from '@chakra-ui/react'

interface props {
  name: string
  description?: string
}

const useErrorPopup = () => {
  const chakraToast = useToast()
  return ({ name, description }: props) => {
    return chakraToast({
      title: name,
      description,
      status: 'error',
      duration: 10000,
      isClosable: true,
    })
  }
}

export default useErrorPopup
