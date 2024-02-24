import express from 'express'
import { getSaved, getSearchedUsers, getUserData, updateUser } from './controllers/userDataController'
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

verifiedRouter.get('/protected/user/:username/data', getUserData)
verifiedRouter.get('/protected/user/saved', getSaved)
verifiedRouter.patch('/protected/user', updateUser)

verifiedRouter.get('/protected/user/search/:search', getSearchedUsers)

verifiedRouter.post('/protected/follow/:username', createFollow)
verifiedRouter.delete('/protected/unfollow/:username', removeFollow)

verifiedRouter.post('/protected/followRequest/:username', createFollowRequest)
verifiedRouter.delete('/protected/unfollowRequest/:username', removeFollowRequest)

verifiedRouter.get('/protected/notifications', getNotifications)
verifiedRouter.delete('/protected/notifications/:notificationId/delete', deleteNotification)
verifiedRouter.post('/protected/notifications/:notificationId/accept', acceptFollowRequest)
verifiedRouter.delete('/protected/notifications/:notificationId/deny', denyFollowRequest)

verifiedRouter.post('/protected/posts/createPost', createPost)
verifiedRouter.get('/protected/posts/:postId', getPost)
verifiedRouter.delete('/protected/posts/:postId/delete', deletePost)
verifiedRouter.post('/protected/posts/:postId/comment', createComment)
verifiedRouter.get('/protected/posts/:postId/like', handleLike)
verifiedRouter.get('/protected/posts/:postId/save', handleSave)

verifiedRouter.get('/protected/myFeed', getMyFeed)

verifiedRouter.get('/protected/conversations/find/:username', findConversation)
verifiedRouter.get('/protected/conversations', getConversations)

verifiedRouter.get('/protected/conversation/:conversationId/user', getConversationOtherUser)
verifiedRouter.get('/protected/conversation/:conversationId/messages', getMessages)
verifiedRouter.post('/protected/conversation/:conversationId/messages/create', createMessage)

export default verifiedRouter
