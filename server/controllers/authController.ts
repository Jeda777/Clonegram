import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'

const prisma = new PrismaClient()

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, username, image } = req.body

  if (!email || !password || !username || !image) {
    res.statusMessage = 'Missing data'
    return res.sendStatus(400)
  }
  const existingUsername = await prisma.user.findFirst({ where: { username } })
  if (existingUsername) {
    res.statusMessage = 'Username in use'
    return res.sendStatus(409)
  }
  const existingEmail = await prisma.user.findFirst({ where: { email } })
  if (existingEmail) {
    res.statusMessage = 'Email in use'
    return res.sendStatus(409)
  }

  const imageUpload = await cloudinary.uploader.upload(image, {
    use_filename: false,
    folder: '/user',
    transformation: { crop: 'fill', aspect_ratio: 1, quality: 'auto:good' },
  })

  const encryptedPassword = await bcrypt.hash(password, 10)

  const accessToken = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30s' })
  const refreshToken = jwt.sign({ username: username }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '1d' })
  const newUser = await prisma.user.create({
    data: {
      imageUrl: imageUpload.secure_url,
      imagePublicId: imageUpload.public_id,
      username,
      email,
      password: encryptedPassword,
      refreshToken,
    },
  })

  res.cookie('jwt', newUser.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
  return res.json({
    accessToken,
    email: newUser.email,
    username: newUser.username,
    imageUrl: newUser.imageUrl,
    id: newUser.id,
  })
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.statusMessage = 'Missing data'
    return res.sendStatus(400)
  }

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

  res.cookie('jwt', updatedUser.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
  return res.json({
    accessToken,
    email: updatedUser.email,
    username: updatedUser.username,
    imageUrl: updatedUser.imageUrl,
    id: updatedUser.id,
  })
}
