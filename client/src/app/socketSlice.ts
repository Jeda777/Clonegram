import { createSlice } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_BACKEND_URL)

const initialState = {
  socket: socket,
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {},
})

export default socketSlice.reducer
