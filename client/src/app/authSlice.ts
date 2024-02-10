import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { authObject } from '../../types'

const persistData = localStorage.getItem('persist')
const initialPersistState = persistData ? (JSON.parse(persistData) as boolean) : false

const initialState: authObject & { persist: boolean } = {
  accessToken: '',
  email: '',
  id: '',
  imageUrl: '',
  username: '',
  persist: initialPersistState,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<authObject>) => {
      const { accessToken, email, id, imageUrl, username } = action.payload
      state.accessToken = accessToken
      state.email = email
      state.id = id
      state.imageUrl = imageUrl
      state.username = username
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    setPersist: (state, action: PayloadAction<boolean>) => {
      state.persist = action.payload
    },
    logOut: (state) => {
      state.accessToken = ''
      state.email = ''
      state.id = ''
      state.imageUrl = ''
      state.username = ''
    },
  },
})

export const { setAccessToken, setAuthData, setPersist, logOut } = authSlice.actions

export default authSlice.reducer
