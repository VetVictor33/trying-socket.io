import { createKeyboardListener } from "./keyboard-listener.js"
import { messenger } from "./messenger.js"
import { setOnline } from "./setOnline.js"

const socket = io({
  auth: {
    serverOffset: 0
  }
})

const { start, state: localState, addMessage } = messenger(document)

socket.on('connect', () => {
  socket.emit('first connection')
  socket.on('initial data', (serverState) => {
    localState.online = serverState.online
    localState.currentUser = serverState.currentUser
    localState.messages = [...serverState.messages]
    createKeyboardListener(document, localState, socket)
    start()
  })
})

socket.on('online change', (online) => {
  setOnline(document, online)
})


socket.on('chat message', (message, serverOffset) => {
  addMessage(message)
  socket.auth.serverOffset = serverOffset;
})

