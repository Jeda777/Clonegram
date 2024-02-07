import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const registerUser = async (email: string, username: string, password: string, imageUrl: string) => {
  const moddifiedImageUrl = `${process.env.BACKEND_URL}/${imageUrl}`
  const encryptedPassword = await bcrypt.hash(password, 10)

  const accessToken = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30s' })
  const refreshToken = jwt.sign({ username: username }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '1d' })
  const newUser = await prisma.user.create({
    data: { imageUrl: moddifiedImageUrl, username, email, password: encryptedPassword, refreshToken },
  })

  return {
    accessToken,
    user: {
      email: newUser.email,
      username: newUser.username,
      imageUrl: newUser.imageUrl,
      id: newUser.id,
      refreshToken: newUser.refreshToken,
    },
  }
}
