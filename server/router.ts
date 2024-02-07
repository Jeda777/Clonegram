import express, { Request, Response } from 'express'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { PrismaClient } from '@prisma/client'
import { registerUser } from './controllers/authController'

const prisma = new PrismaClient()

const router = express.Router()

router.post('/auth', async (req: Request, res: Response) => {
  const { actionType, email, password, username, image } = req.body
  if (actionType === 'register') {
    if (!email || !password || !username || !image) return res.status(400).json({ error: 'Bad Request' })
    const existingUser = await prisma.user.findFirst({ where: { username } })
    if (existingUser) return res.status(409).json({ error: 'Username in use' })
    const base64Image: string = image.split(';base64,').pop()
    const imageUrl = `assets/profilePictures/${uuidv4()}.png`
    fs.writeFileSync(imageUrl, base64Image, { encoding: 'base64' })
    const newUser = await registerUser(email, username, password, imageUrl)
    return res.json(newUser)
  } else if (actionType === 'login') {
    if (!email || !password) return res.status(400).json({ error: 'Bad Request' })
    console.log(email, password)
    return res.json({ message: 'Everything is fine' })
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
  console.log(req.url.slice(1))
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
