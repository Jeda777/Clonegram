import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { customRequest } from '../types'

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const SECRET = process.env.ACCESS_TOKEN_SECRET as string

  const authHeader = req.headers['authorization']
  if (!authHeader) return res.sendStatus(401)

  const token = authHeader.split(' ')[1]

  jwt.verify(token, SECRET, (error, decoded) => {
    if (error) return res.sendStatus(403)
    ;(req as customRequest).username = (decoded as any).username
    next()
  })
}

export default verifyJWT
