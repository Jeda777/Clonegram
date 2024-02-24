import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { customRequest } from '../types'

const prisma = new PrismaClient()

export const getUserData = async (req: Request, res: Response) => {
  const { username } = req.params
  const requesterUsername = (req as customRequest).username

  const requester = await prisma.user.findUnique({ where: { username: requesterUsername } })
  if (!requester) return res.sendStatus(404)

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      username: true,
      imageUrl: true,
      description: true,
      private: true,
      id: true,
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
    },
  })
  if (!user) return res.sendStatus(404)

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

  const posts = await prisma.post.findMany({
    where: { userId: user.id },
    include: { _count: { select: { comments: true, likes: true } } },
    orderBy: { createdAt: 'desc' },
  })

  const dataWithPosts = {
    ...data,
    posts,
  }
  return res.json(dataWithPosts)
}

export const updateUser = async (req: Request, res: Response) => {
  const username = (req as customRequest).username

  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) return res.sendStatus(404)

  const { description, isPrivate } = req.body
  await prisma.user.update({ where: { username }, data: { description, private: isPrivate } })
  return res.sendStatus(200)
}

export const getSearchedUsers = async (req: Request, res: Response) => {
  const { search } = req.query
  if (!search) return res.sendStatus(400)

  const users = await prisma.user.findMany({
    where: { username: { contains: search as string } },
    take: 5,
    select: { imageUrl: true, username: true },
  })

  return res.json(users)
}

export const getSaved = async (req: Request, res: Response) => {
  const username = (req as customRequest).username

  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) return res.sendStatus(404)

  const saved = await prisma.save.findMany({
    where: { userId: user.id },
    include: { post: { include: { _count: { select: { comments: true, likes: true } } } } },
    orderBy: { createdAt: 'desc' },
  })

  return res.json(saved)
}
