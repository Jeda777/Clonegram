import express, { Request, Response } from 'express'

const router = express.Router()

router.post('/auth', (req: Request, res: Response) => {
  const { actionType, email, password, username } = req.body
  return res.json({ message: 'Everything is fine' })
})

export default router
