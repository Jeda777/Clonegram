import express from 'express'
import { handleUserDataGet, handleUserDescriptionUpdate } from './controllers/userDataController'

const verifiedRouter = express.Router()

verifiedRouter.get('/protected/user/getData/:username', handleUserDataGet)

verifiedRouter.patch('/protected/user/updateDescription', handleUserDescriptionUpdate)

export default verifiedRouter
