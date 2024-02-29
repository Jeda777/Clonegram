import { useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'
import useErrorPopup from '../hooks/useErrorPopup'
import { AxiosError } from 'axios'
import { Flex, useColorModeValue } from '@chakra-ui/react'
import { Bookmark } from 'lucide-react'

interface props {
  isSaved: boolean
  postId: string
}

const SaveButton = ({ isSaved, postId }: props) => {
  const [isSavedState, setIsSavedState] = useState(isSaved)
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  const errorPopup = useErrorPopup()

  const handleSave = async () => {
    try {
      await axiosPrivate.get(`protected/posts/${postId}/save`)
      setIsSavedState((prev) => !prev)
    } catch (error) {
      const errorStatus = (error as AxiosError).response?.status as number
      if (errorStatus === 401) {
        navigate('/sign-in', { state: { from: location }, replace: true })
        errorPopup({ name: 'Session expired' })
      } else if (errorStatus === 404) {
        errorPopup({ name: 'Something went wrong' })
      } else {
        console.log(error)
      }
    }
  }

  return (
    <Flex onClick={handleSave} cursor='pointer'>
      {!isSavedState ? (
        <Bookmark />
      ) : (
        <Bookmark color={useColorModeValue('#1A202C', '#ffffffeb')} fill={useColorModeValue('#1A202C', '#ffffffeb')} />
      )}
    </Flex>
  )
}

export default SaveButton
