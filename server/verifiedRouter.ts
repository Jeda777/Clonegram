import express from 'express'
import { handleUserDataGet } from './controllers/userDataController'

const verifiedRouter = express.Router()

verifiedRouter.get('/protected/user/getData/:username', handleUserDataGet)

export default verifiedRouter
