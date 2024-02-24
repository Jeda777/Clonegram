import express from 'express'
import { getSearchedUsers, getUserData, updateUser } from './controllers/userDataController'
import {
  acceptFollowRequest,
  createFollow,
  createFollowRequest,
  denyFollowRequest,
  removeFollow,
  removeFollowRequest,
} from './controllers/followController'
import { deleteNotification, getNotifications } from './controllers/notificationsController'
import { createComment, createPost, deletePost, getPost, handleLike, handleSave } from './controllers/postsController'
import { getMyFeed } from './controllers/feedController'
import {
  createMessage,
  findConversation,
  getConversationOtherUser,
  getConversations,
  getMessages,
} from './controllers/conversationsController'

const verifiedRouter = express.Router()

verifiedRouter.get('/protected/user/getData/:username', getUserData)

verifiedRouter.patch('/protected/user/updateDescription', updateUser)
verifiedRouter.get('/protected/user/search', getSearchedUsers)

verifiedRouter.post('/protected/follow/:username', createFollow)
verifiedRouter.delete('/protected/unfollow/:username', removeFollow)

verifiedRouter.post('/protected/followRequest/:username', createFollowRequest)
verifiedRouter.delete('/protected/unfollowRequest/:username', removeFollowRequest)

verifiedRouter.get('/protected/notifications', getNotifications)
verifiedRouter.delete('/protected/notifications/:notificationId', deleteNotification)
verifiedRouter.post('/protected/notifications/accept/:notificationId', acceptFollowRequest)
verifiedRouter.delete('/protected/notifications/deny/:notificationId', denyFollowRequest)

verifiedRouter.post('/protected/posts/createPost', createPost)
verifiedRouter.delete('/protected/posts/deletePost/:postId', deletePost)
verifiedRouter.get('/protected/posts/:postId', getPost)
verifiedRouter.post('/protected/posts/:postId/comment', createComment)
verifiedRouter.get('/protected/posts/like/:postId', handleLike)
verifiedRouter.get('/protected/posts/save/:postId', handleSave)
verifiedRouter.get('/protected/myFeed', getMyFeed)

verifiedRouter.get('/protected/conversation/find', findConversation)
verifiedRouter.get('/protected/conversation/all', getConversations)
verifiedRouter.get(`/protected/conversation/user`, getConversationOtherUser)
verifiedRouter.get('/protected/conversation/messages', getMessages)
verifiedRouter.post('/protected/conversation/messages/create', createMessage)

export default verifiedRouter
