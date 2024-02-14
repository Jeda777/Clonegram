import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { customRequest } from '../types'

const prisma = new PrismaClient()

const POSTS_TAKE = 5

export const getMyFeed = async (req: Request, res: Response) => {
  const username = (req as customRequest).username
  const { lastId } = req.query

  if (lastId !== '' && lastId !== undefined) {
    const posts = await prisma.post.findMany({
      where: { user: { followers: { some: { follower: { username } } } } },
      include: {
        _count: { select: { comments: true, likes: true } },
        likes: { select: { userId: true } },
        user: { select: { imageUrl: true, username: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: POSTS_TAKE,
      cursor: { id: lastId as string },
      skip: 1,
    })
    const count = await prisma.post.count({
      where: { user: { followers: { some: { follower: { username } } } } },
      cursor: { id: lastId as string },
    })

    const newLastId = posts.length > 0 ? posts[posts.length - 1].id : ''
    const isLast = posts.length === count

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
    const count = await prisma.post.count({ where: { user: { followers: { some: { follower: { username } } } } } })

    const newLastId = posts.length > 0 ? posts[posts.length - 1].id : ''
    const isLast = posts.length === count

    return res.json({ posts, newLastId, isLast })
  }
}
