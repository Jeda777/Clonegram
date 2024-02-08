import express, { Request, Response } from 'express'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { PrismaClient } from '@prisma/client'
import { loginUser, registerUser } from './controllers/authController'

const prisma = new PrismaClient()

const router = express.Router()

router.post('/auth', async (req: Request, res: Response) => {
  const { actionType, email, password, username, image } = req.body
  if (actionType === 'register') {
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
    const base64Image: string = image.split(';base64,').pop()
    const imageUrl = `assets/profilePictures/${uuidv4()}.png`
    fs.writeFileSync(imageUrl, base64Image, { encoding: 'base64' })
    registerUser(email, username, password, imageUrl, res)
  } else if (actionType === 'login') {
    if (!email || !password) {
      res.statusMessage = 'Missing data'
      return res.sendStatus(400)
    }
    loginUser(email, password, res)
  } else {
    return res.status(400).json({ error: 'Bad Request' })
  }
})

router.get('/assets/profilePictures/:id', (req: Request, res: Response) => {
  fs.readFile(req.url.slice(1), (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('404: File not found')
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(data)
    }
  })
})

router.get('/assets/posts/:id', (req: Request, res: Response) => {
  fs.readFile(req.url.slice(1), (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('404: File not found')
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(data)
    }
  })
})

export default router
