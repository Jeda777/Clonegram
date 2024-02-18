import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { customRequest } from '../types'

const prisma = new PrismaClient()

export const findConversation = async (req: Request, res: Response) => {
  const requesterUsername = (req as customRequest).username
  const { username } = req.query

  const user1 = await prisma.user.findUnique({
    where: { username: requesterUsername },
    include: { conversationsInitiated: { select: { id: true } }, conversationsReceived: { select: { id: true } } },
  })
  if (!user1) return res.sendStatus(404)

  const user1Conversation = Array.from([...(user1?.conversationsInitiated as []), ...(user1?.conversationsReceived as [])])

  const user2 = await prisma.user.findUnique({
    where: { username: username as string },
    include: { conversationsInitiated: { select: { id: true } }, conversationsReceived: { select: { id: true } } },
  })
  if (!user2) return res.sendStatus(404)

  const user2Conversation = Array.from([...(user2?.conversationsInitiated as []), ...(user2?.conversationsReceived as [])])

  const matchingConversationId = user1Conversation.filter((c) => {
    return user2Conversation.indexOf(c) === -1
  }) as { id: string }[]

  if (matchingConversationId.length === 0) return createConversation(req, res)

  return res.json(matchingConversationId[0].id)
}

export const createConversation = async (req: Request, res: Response) => {
  const requesterUsername = (req as customRequest).username
  const { username } = req.query

  const user1 = await prisma.user.findUnique({ where: { username: requesterUsername } })
  if (!user1) return res.sendStatus(404)

  const user2 = await prisma.user.findUnique({ where: { username: username as string } })
  if (!user2) return res.sendStatus(404)

  const conversation = await prisma.conversation.create({ data: { userId1: user1.id, userId2: user2.id } })

  return res.json(conversation.id)
}

export const getConversations = async (req: Request, res: Response) => {
  const username = (req as customRequest).username

  const user = await prisma.user.findUnique({
    where: { username: username },
  })
  if (!user) return res.sendStatus(404)

  const conversations = await prisma.conversation.findMany({
    where: { OR: [{ userId1: user.id }, { userId2: user.id }] },
    orderBy: { updatedAt: 'desc' },
    include: {
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1,
        select: { content: true, sender: { select: { username: true } } },
      },
      user1: { select: { username: true, imageUrl: true } },
      user2: { select: { username: true, imageUrl: true } },
    },
  })

  return res.json(conversations)
}

export const getConversationOtherUser = async (req: Request, res: Response) => {
  const username = (req as customRequest).username
  const { conversationId } = req.query

  const user = await prisma.user.findUnique({
    where: { username },
  })
  if (!user) return res.sendStatus(404)

  if (typeof conversationId !== 'string') return res.sendStatus(400)

  const conversation = await prisma.conversation.findUnique({ where: { id: conversationId } })
  if (!conversation) return res.status(404)
  if (conversation.userId1 !== user.id && conversation.userId2 !== user.id) return res.sendStatus(403)

  if (conversation.userId1 !== user.id) {
    const user = await prisma.user.findUnique({ where: { id: conversation.userId1 }, select: { imageUrl: true, username: true } })
    return res.json(user)
  } else {
    const user = await prisma.user.findUnique({ where: { id: conversation.userId2 }, select: { imageUrl: true, username: true } })
    return res.json(user)
  }
}

const MESSAGES_TAKE = 10

export const getMessages = async (req: Request, res: Response) => {
  const username = (req as customRequest).username
  const { conversationId, lastId } = req.query

  if (typeof conversationId !== 'string' || typeof lastId !== 'string') return res.sendStatus(400)

  const user = await prisma.user.findUnique({
    where: { username },
  })
  if (!user) return res.sendStatus(404)

  const conversation = await prisma.conversation.findUnique({ where: { id: conversationId } })
  if (!conversation) return res.status(404)
  if (conversation.userId1 !== user.id && conversation.userId2 !== user.id) return res.sendStatus(403)

  if (lastId === '') {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'desc' },
      take: MESSAGES_TAKE,
    })
    return res.json(messages)
  } else {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'desc' },
      take: MESSAGES_TAKE,
      cursor: { id: lastId },
      skip: 1,
    })
    return res.json(messages)
  }
}
