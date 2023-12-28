import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url';
import express from 'express'
import { Server } from 'socket.io';

import { messenger } from './public/features/messenger.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {}
})

app.use(express.static(path.join(__dirname, 'public')))

const { state } = messenger()

io.on('connection', (socket) => {
  console.log(`--> Connected ${socket.id}`)
  state.online++
  state.currentUser = socket.id

  socket.on('first connection', () => {
    socket.emit('initial data', state)
  })

  socket.on('chat message', (data) => {
    state.messages.push({ value: data.message, sender: data.sender })
    io.emit('chat message', { value: data.message, sender: data.sender }, state)
  })

  socket.on('typing', (data) => {
    io.emit('typing', data)
  })

  socket.on('disconnect', () => {
    state.online--
    console.log(`--> Disconnected ${socket.id}`)
    io.emit('online change', state.online)
  })

  io.emit('online change', state.online)
})



server.listen(3000, () => {
  console.log('Server running on port 3000')
})