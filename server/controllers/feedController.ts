import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { customRequest } from '../types'

const prisma = new PrismaClient()

const POSTS_TAKE = 5

export const getMyFeed = async (req: Request, res: Response) => {
  const username = (req as customRequest).username
  const { lastId } = req.body

  if (lastId) {
    const posts = await prisma.post.findMany({
      where: { user: { followers: { some: { follower: { username } } } } },
      include: {
        _count: { select: { comments: true, likes: true } },
        likes: { select: { userId: true } },
        user: { select: { imageUrl: true, username: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: POSTS_TAKE,
      cursor: lastId,
      skip: 1,
    })

    const newLastId = posts[posts.length - 1].id
    const isLast = posts.length < POSTS_TAKE

    return res.json({ posts, newLastId, isLast })
  } else {
    const posts = await prisma.post.findMany({
      where: { user: { followers: { some: { follower: { username } } } } },
      include: {
        _count: { select: { comments: true, likes: true } },
        likes: { select: { userId: true } },
        user: { select: { imageUrl: true, username: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: POSTS_TAKE,
    })

    const newLastId = posts[posts.length - 1].id
    const isLast = posts.length < POSTS_TAKE

    return res.json({ posts, newLastId, isLast })
  }
}
