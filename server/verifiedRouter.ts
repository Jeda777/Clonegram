import express from 'express'
import { handleUserDataGet, handleUserDescriptionAndPrivateUpdate } from './controllers/userDataController'
import { createFollow, createFollowRequest, removeFollow, removeFollowRequest } from './controllers/followController'
import { handleNotificationsGet } from './controllers/notificationsController'

const verifiedRouter = express.Router()

verifiedRouter.get('/protected/user/getData/:username', handleUserDataGet)

verifiedRouter.patch('/protected/user/updateDescription', handleUserDescriptionAndPrivateUpdate)

verifiedRouter.post('/protected/follow/:username', createFollow)
verifiedRouter.delete('/protected/unfollow/:username', removeFollow)

verifiedRouter.post('/protected/followRequest/:username', createFollowRequest)
verifiedRouter.delete('/protected/unfollowRequest/:username', removeFollowRequest)

verifiedRouter.get('/protected/notifications', handleNotificationsGet)

export default verifiedRouter
