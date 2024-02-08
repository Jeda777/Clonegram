import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const verifiedRouter = express.Router()

export default verifiedRouter
