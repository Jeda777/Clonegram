import express, { Request, Response } from 'express'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

router.post('/auth', (req: Request, res: Response) => {
  const { actionType, email, password, username, image } = req.body
  if (actionType === 'register') {
    if (!email || !password || !username || !image) return res.status(400).json({ error: 'Bad Request' })
    const base64Image: string = image.split(';base64,').pop()
    const imageUrl = `assets/profilePictures/${uuidv4()}.png`
    fs.writeFileSync(imageUrl, base64Image, { encoding: 'base64' })
    console.log(email, password, username)
  } else if (actionType === 'login') {
    if (!email || !password) return res.status(400).json({ error: 'Bad Request' })
    console.log(email, password)
  } else {
    return res.status(400).json({ error: 'Bad Request' })
  }

  return res.json({ message: 'Everything is fine' })
})

export default router
