import { v4 as uuidv4 } from 'uuid'
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { customRequest } from '../types'
import fs from 'fs'

const prisma = new PrismaClient()

export const createPost = async (req: Request, res: Response) => {
  const username = (req as customRequest).username
  const { image } = req.body

  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) return res.sendStatus(404)

  const base64Image: string = image.split(';base64,').pop()
  const imageUrl = `assets/posts/${uuidv4()}.png`
  fs.writeFileSync(imageUrl, base64Image, { encoding: 'base64' })
  const modifiedImageUrl = `${process.env.BACKEND_URL}/${imageUrl}`

  await prisma.post.create({ data: { userId: user?.id, imageUrl: modifiedImageUrl } })

  return res.sendStatus(200)
}

export const getPost = async (req: Request, res: Response) => {
  const username = (req as customRequest).username
  const { postId } = req.params

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      _count: { select: { comments: true, likes: true } },
      likes: { select: { userId: true } },
      user: { select: { imageUrl: true, username: true } },
      comments: {
        include: { user: { select: { imageUrl: true, username: true } } },
        orderBy: { createdAt: 'desc' },
      },
    },
  })
  if (!post) return res.sendStatus(404)

  const postUser = await prisma.user.findFirst({ where: { posts: { some: { id: post.id } } } })
  if (!postUser) return res.sendStatus(404)

  if (!postUser.private) {
    return res.json({ post, isAllowed: true })
  } else {
    const user = await prisma.user.findUnique({ where: { username } })
    if (!user) return res.sendStatus(404)

    const following = await prisma.follow.findFirst({ where: { userId: user.id, followerId: postUser.id } })
    if (!following) {
      return res.json({ isAllowed: false })
    } else {
      return res.json({ post, isAllowed: true })
    }
  }
}

export const handleLike = async (req: Request, res: Response) => {
  const username = (req as customRequest).username
  const { postId } = req.params

  const existingLike = await prisma.like.findFirst({ where: { postId, user: { username } } })

  if (!existingLike) {
    const user = await prisma.user.findUnique({ where: { username } })
    if (!user) return res.sendStatus(404)
    await prisma.like.create({ data: { postId, userId: user.id } })
    return res.sendStatus(201)
  }

  await prisma.like.delete({ where: { id: existingLike.id } })

  return res.sendStatus(200)
}

export const createComment = async (req: Request, res: Response) => {
  const username = (req as customRequest).username
  const { postId } = req.params
  const { comment } = req.body

  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) return res.sendStatus(404)

  const createdComment = await prisma.comment.create({
    data: { content: comment, postId, userId: user.id },
    include: { user: { select: { imageUrl: true, username: true } } },
  })

  return res.json(createdComment)
}
