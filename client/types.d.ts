export type authObject = {
  accessToken: string
  email: string
  id: string
  imageUrl: string
  username: string
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
