import { Flex, Text } from '@chakra-ui/react'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { AxiosError } from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import useErrorPopup from '../hooks/useErrorPopup'

interface props {
  isLiked: boolean
  likeCount: number
  postId: string
}

const LikeButton = ({ isLiked, likeCount, postId }: props) => {
  const [likeData, setLikeData] = useState({ isLiked, likeCount })
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  const errorPopup = useErrorPopup()

  const handleLike = async () => {
    try {
      const newLikeCount = await axiosPrivate.get(`protected/posts/${postId}/like`)
      setLikeData((prev) => ({ isLiked: !prev.isLiked, likeCount: newLikeCount.data }))
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
    <Flex gap={1} onClick={handleLike} cursor='pointer'>
      {!likeData.isLiked ? <Heart /> : <Heart color='red' fill='red' />}
      <Text>{likeData.likeCount}</Text>
    </Flex>
  )
}

export default LikeButton
