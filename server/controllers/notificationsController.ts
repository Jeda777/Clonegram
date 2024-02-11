import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { customRequest } from '../types'

const prisma = new PrismaClient()

export const handleNotificationsGet = async (req: Request, res: Response) => {
  const username = (req as customRequest).username
  const user = await prisma.user.findUnique({
    where: { username: username },
    select: { id: true },
  })

  const notifications = await prisma.notification.findMany({
    where: { receiverUserId: user?.id },
    include: { fromUser: { select: { id: true, username: true, imageUrl: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return res.json(notifications)
}
