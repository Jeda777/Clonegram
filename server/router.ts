import express, { Request, Response } from 'express'
import fs from 'fs'
import { loginUser, registerUser } from './controllers/authController'
import handleRefreshToken from './controllers/refreshTokenController'
import handleLogout from './controllers/logoutController'

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/refresh', handleRefreshToken)
router.get('/logout', handleLogout)

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
