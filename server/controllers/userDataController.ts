import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { customRequest } from '../types'

const prisma = new PrismaClient()

export const handleUserDataGet = async (req: Request, res: Response) => {
  const { username } = req.params
  const requesterUsername = (req as customRequest).username

  const requester = await prisma.user.findUnique({ where: { username: requesterUsername } })

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      username: true,
      imageUrl: true,
      description: true,
      private: true,
      id: true,
      postsCount: true,
      followersCount: true,
      followingCount: true,
    },
  })
  if (!user) {
    res.statusMessage = 'User not found'
    return res.sendStatus(404)
  }

  const following = await prisma.follow.findFirst({ where: { userId: user.id, followerId: requester?.id } })
  const isFollowing = !following ? false : true
  const followRequested = await prisma.followRequest.findFirst({ where: { userId: user.id, followerId: requester?.id } })
  const isRequested = !followRequested ? false : true
  const isOwnUser = requesterUsername === user.username

  let isAllowed: boolean

  if (isOwnUser) {
    isAllowed = true
  } else {
    if (!user.private) {
      isAllowed = true
    } else {
      isAllowed = isFollowing
    }
  }

  const data = {
    user,
    isFollowing,
    isRequested,
    isOwnUser,
    isAllowed,
  }

  if (!isAllowed) return res.json(data)

  const posts = await prisma.post.findMany({ where: { userId: user.id } })

  const dataWithPosts = {
    ...data,
    posts,
  }
  return res.json(dataWithPosts)
}

export const handleUserDescriptionUpdate = async (req: Request, res: Response) => {
  const requesterUsername = (req as customRequest).username
  const { description } = req.body
  await prisma.user.update({ where: { username: requesterUsername }, data: { description } })
  return res.sendStatus(200)
}
