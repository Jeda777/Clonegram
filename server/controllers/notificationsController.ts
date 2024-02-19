import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { customRequest } from '../types'

const prisma = new PrismaClient()

export const getNotifications = async (req: Request, res: Response) => {
  const username = (req as customRequest).username
  const user = await prisma.user.findUnique({
    where: { username: username },
    select: { id: true },
  })
  if (!user) return res.sendStatus(404)

  const notifications = await prisma.notification.findMany({
    where: { receiverUserId: user?.id },
    include: { fromUser: { select: { id: true, username: true, imageUrl: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return res.json(notifications)
}

export const deleteNotification = async (req: Request, res: Response) => {
  const username = (req as customRequest).username
  const { notificationId } = req.params

  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
    include: { receiverUser: true },
  })
  if (!notification) return res.sendStatus(404)
  if (notification?.receiverUser.username !== username) return res.sendStatus(403)

  await prisma.notification.delete({ where: { id: notificationId } })

  return res.sendStatus(200)
}
