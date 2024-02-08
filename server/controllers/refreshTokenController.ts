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

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (error: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
    if (error || existingUser.username !== (decoded as any).username) return res.sendStatus(403)
    const accessToken = jwt.sign({ username: existingUser.username }, ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
    res.json({ accessToken })
  })
}

export default handleRefreshToken
