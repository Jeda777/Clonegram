import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { customRequest } from '../types'

const prisma = new PrismaClient()

export const createFollow = async (req: Request, res: Response) => {
  const requesterUsername = (req as customRequest).username
  const follower = await prisma.user.update({
    where: { username: requesterUsername },
    select: { id: true },
    data: { followingCount: { increment: 1 } },
  })
  if (!follower) return res.status(404)
  const { username } = req.params
  const user = await prisma.user.update({
    where: { username: username },
    select: { id: true },
    data: { followersCount: { increment: 1 } },
  })
  if (!user) return res.status(404)
  await prisma.follow.create({ data: { followerId: follower.id, userId: user.id } })
  return res.sendStatus(200)
}

export const removeFollow = async (req: Request, res: Response) => {
  const requesterUsername = (req as customRequest).username
  const follower = await prisma.user.update({
    where: { username: requesterUsername },
    select: { id: true },
    data: { followingCount: { decrement: 1 } },
  })
  if (!follower) return res.status(404)
  const { username } = req.params
  const user = await prisma.user.update({
    where: { username: username },
    select: { id: true },
    data: { followersCount: { decrement: 1 } },
  })
  if (!user) return res.status(404)
  await prisma.follow.deleteMany({ where: { followerId: follower.id, userId: user.id } })
  return res.sendStatus(200)
}

export const createFollowRequest = async (req: Request, res: Response) => {
  const requesterUsername = (req as customRequest).username
  const follower = await prisma.user.findUnique({
    where: { username: requesterUsername },
    select: { id: true },
  })
  if (!follower) return res.status(404)
  const { username } = req.params
  const user = await prisma.user.findUnique({
    where: { username: username },
    select: { id: true },
  })
  if (!user) return res.status(404)
  await prisma.followRequest.create({ data: { followerId: follower.id, userId: user.id } })
  return res.sendStatus(200)
}

export const removeFollowRequest = async (req: Request, res: Response) => {
  const requesterUsername = (req as customRequest).username
  const follower = await prisma.user.findUnique({
    where: { username: requesterUsername },
    select: { id: true },
  })
  if (!follower) return res.status(404)
  const { username } = req.params
  const user = await prisma.user.findUnique({
    where: { username: username },
    select: { id: true },
  })
  if (!user) return res.status(404)
  await prisma.followRequest.deleteMany({ where: { followerId: follower.id, userId: user.id } })
  return res.sendStatus(200)
}
