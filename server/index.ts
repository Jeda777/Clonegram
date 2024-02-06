import express, { Express } from 'express'
import dotenv from 'dotenv'
import socketio from 'socket.io'
import http from 'http'

dotenv.config()
const port = process.env.PORT || 3000

const app = express()
const httpServer = http.createServer(app)
const io = new socketio.Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_SITE_URL!,
  },
})

io.on('connection', (socket) => {
  console.log(`connected ${socket.id}`)
})

httpServer.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
