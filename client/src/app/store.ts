import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import tabsSlice from './tabsSlice'
import shareModalSlice from './shareModalSlice'
import socketSlice from './socketSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tabs: tabsSlice,
    shareModal: shareModalSlice,
    socket: socketSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
