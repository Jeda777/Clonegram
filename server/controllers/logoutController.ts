import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

const handleLogout = async (req: Request, res: Response) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt

  const existingUser = await prisma.user.findFirst({ where: { refreshToken } })
  if (!existingUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
    return res.sendStatus(204)
  }

  const user = await prisma.user.update({ where: { id: existingUser.id }, data: { refreshToken: '' } })

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
  return res.sendStatus(204)
}

export default handleLogout
