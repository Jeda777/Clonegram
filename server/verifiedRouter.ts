import express from 'express'
import { handleUserDataGet, handleUserDescriptionAndPrivateUpdate } from './controllers/userDataController'
import {
  acceptFollowRequest,
  createFollow,
  createFollowRequest,
  denyFollowRequest,
  removeFollow,
  removeFollowRequest,
} from './controllers/followController'
import { handleNotificationsDelete, handleNotificationsGet } from './controllers/notificationsController'
import { createComment, createPost, getPost, handleLike } from './controllers/postsController'
import { getMyFeed } from './controllers/feedController'

const verifiedRouter = express.Router()

verifiedRouter.get('/protected/user/getData/:username', handleUserDataGet)

verifiedRouter.patch('/protected/user/updateDescription', handleUserDescriptionAndPrivateUpdate)

verifiedRouter.post('/protected/follow/:username', createFollow)
verifiedRouter.delete('/protected/unfollow/:username', removeFollow)

verifiedRouter.post('/protected/followRequest/:username', createFollowRequest)
verifiedRouter.delete('/protected/unfollowRequest/:username', removeFollowRequest)

verifiedRouter.get('/protected/notifications', handleNotificationsGet)
verifiedRouter.delete('/protected/notifications/:notificationId', handleNotificationsDelete)
verifiedRouter.post('/protected/notifications/accept/:notificationId', acceptFollowRequest)
verifiedRouter.delete('/protected/notifications/deny/:notificationId', denyFollowRequest)

verifiedRouter.post('/protected/posts/createPost', createPost)
verifiedRouter.get('/protected/posts/:postId', getPost)
verifiedRouter.post('/protected/posts/:postId/comment', createComment)
verifiedRouter.get('/protected/posts/like/:postId', handleLike)
verifiedRouter.get('/protected/myFeed', getMyFeed)

export default verifiedRouter
