import express from 'express'
import { handleUserDataGet, handleUserDescriptionUpdate } from './controllers/userDataController'
import { createFollow } from './controllers/followController'

const verifiedRouter = express.Router()

verifiedRouter.get('/protected/user/getData/:username', handleUserDataGet)

verifiedRouter.patch('/protected/user/updateDescription', handleUserDescriptionUpdate)

verifiedRouter.post('/protected/follow/:username', createFollow)

export default verifiedRouter
