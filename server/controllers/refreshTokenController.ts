import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string

const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt

  const existingUser = await prisma.user.findFirst({ where: { refreshToken } })
  if (!existingUser) return res.sendStatus(403)

  const token = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
  if (!token) return res.sendStatus(403)

  const accessToken = jwt.sign({ username: (token as any).username }, ACCESS_TOKEN_SECRET, { expiresIn: '30s' })

  res.json({ accessToken })
}

export default handleRefreshToken
