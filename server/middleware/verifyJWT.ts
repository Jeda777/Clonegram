import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface customRequest extends Request {
  token: string | JwtPayload
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const SECRET = process.env.ACCESS_TOKEN_SECRET as string
  try {
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) throw new Error()

    const decoded = jwt.verify(token, SECRET)
    ;(req as customRequest).token = decoded
    next()
  } catch (error) {
    return res.sendStatus(401)
  }
}

export default verifyJWT
