import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { Response } from 'express'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const registerUser = async (email: string, username: string, password: string, imageUrl: string, res: Response) => {
  const moddifiedImageUrl = `${process.env.BACKEND_URL}/${imageUrl}`
  const encryptedPassword = await bcrypt.hash(password, 10)

  const accessToken = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30s' })
  const refreshToken = jwt.sign({ username: username }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '1d' })
  const newUser = await prisma.user.create({
    data: { imageUrl: moddifiedImageUrl, username, email, password: encryptedPassword, refreshToken },
  })

  return res.json({
    accessToken,
    user: {
      email: newUser.email,
      username: newUser.username,
      imageUrl: newUser.imageUrl,
      id: newUser.id,
      refreshToken: newUser.refreshToken,
    },
  })
}

export const loginUser = async (email: string, password: string, res: Response) => {
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (!existingUser) {
    res.statusMessage = 'User with provided email not found'
    return res.sendStatus(404)
  }

  const matchedPassword = await bcrypt.compare(password, existingUser.password)
  if (!matchedPassword) {
    res.statusMessage = 'Invalid password'
    return res.sendStatus(401)
  }

  const accessToken = jwt.sign({ username: existingUser.username }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30s' })
  const refreshToken = jwt.sign({ username: existingUser.username }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: '1d',
  })
  const updatedUser = await prisma.user.update({ where: { email }, data: { refreshToken } })

  return res.json({
    accessToken,
    user: {
      email: updatedUser.email,
      username: updatedUser.username,
      imageUrl: updatedUser.imageUrl,
      id: updatedUser.id,
      refreshToken: updatedUser.refreshToken,
    },
  })
}
