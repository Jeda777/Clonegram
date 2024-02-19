export type authObject = {
  accessToken: string
  email: string
  id: string
  imageUrl: string
  username: string
}

export type userBaseData = {
  username: string
  imageUrl: string
}

export type api_user_username_data_user = {
  description: string | null
  id: string
  imageUrl: string
  private: boolean
  username: string
  _count: {
    followers: number
    following: number
    posts: number
  }
}

export type api_user_username_data_post = {
  id: string
  userId: string
  imageUrl: string
  createdAt: Date
  _count: {
    comments: number
    likes: number
  }
}

export type api_user_username_data = {
  user: api_user_username_data_user
  posts: api_user_username_data_post[]
  isFollowing: boolean
  isRequested: boolean
  isOwnUser: boolean
  isAllowed: boolean
}

export type notificationTypes = 'FollowRequest' | 'Like' | 'Comment' | 'Follow'

export type api_notifications_user = {
  id: string
  imageUrl: string
  username: string
}

export type api_notifications_with_user = {
  createdAt: Date
  fromUser: api_notifications_user
  fromUserId: string
  id: string
  receiverUserId: string
  type: notificationTypes
}

export type api_myFeed_data_post = api_user_username_data_post & {
  likes: { userId: string }[] | []
  user: {
    username: string
    imageUrl: string
  }
}

export type api_myFeed_data = {
  posts: api_myFeed_data_post[]
  isLast: boolean
  newLastId: string
}

export type api_posts_data_comment = {
  id: string
  postId: string
  userId: string
  user: userBaseData
  content: string
  createdAt: Date
}

export type api_posts_data = {
  post?: api_myFeed_data_post & { comments: api_posts_data_comment[] | [] }
  isAllowed: boolean
}

export type api_posts_data_post = api_myFeed_data_post & { comments: api_posts_data_comment[] | [] }

export type api_conversation_all_data = {
  id: strings
  messages: { content: string; sender: { username: string } }[]
  updatedAt: Date
  user1: userBaseData
  user2: userBaseData
  userId1: string
  userId2: string
}

export type api_conversation_messages_data_message = {
  content: string
  conversationId: string
  createdAt: Date
  id: string
  senderId: string
}

export type api_conversation_messages_data = {
  messages: api_conversation_messages_data_message[]
  isLast: boolean
  lastId: string
}
