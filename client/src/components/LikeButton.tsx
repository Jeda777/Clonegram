import { Flex, Text } from '@chakra-ui/react'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { AxiosError } from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

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

  const handleLike = async () => {
    try {
      await axiosPrivate.get(`protected/posts/like/${postId}`)
      setLikeData((prev) => {
        if (prev.isLiked) {
          return {
            isLiked: false,
            likeCount: prev.likeCount - 1,
          }
        } else {
          return {
            isLiked: true,
            likeCount: prev.likeCount + 1,
          }
        }
      })
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        navigate('/sign-in', { state: { from: location }, replace: true })
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
