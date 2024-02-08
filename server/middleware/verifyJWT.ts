import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface customRequest extends Request {
  user: string
}

const verifyJWT = (req: customRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  if (!authHeader) return res.sendStatus(401)

  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, decoded) => {
    if (error) return res.sendStatus(403)
    req.user = (decoded as any).username
    next()
  })
}

export default verifyJWT
