import express from 'express'
import dotenv from 'dotenv'
import socketio from 'socket.io'
import http from 'http'
import cors from 'cors'
import router from './router'

dotenv.config()
const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true, allowedHeaders: 'Content-Type' }))
app.use(router)

const httpServer = http.createServer(app)

const io = new socketio.Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
})

io.on('connection', (socket) => {
  console.log(`connected ${socket.id}`)
})

httpServer.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
