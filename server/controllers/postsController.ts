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
  const moddifiedImageUrl = `${process.env.BACKEND_URL}/${imageUrl}`

  await prisma.post.create({ data: { userId: user?.id, imageUrl: moddifiedImageUrl } })

  return res.sendStatus(200)
}
