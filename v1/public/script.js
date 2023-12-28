import { createKeyboardListener } from "./keyboard-listener.js"
import { messenger } from "./messenger.js"
import { setOnline } from "./setOnline.js"
import { setTyping } from "./setTyping.js"

const socket = io({
  auth: {
    serverOffset: 0
  }
})

const { start, state: localState, addMessage } = messenger(document)
const keyboardListener = createKeyboardListener(document)

socket.on('connect', () => {
  socket.emit('first connection')

  socket.on('initial data', (serverState) => {

    localState.online = serverState.online
    localState.currentUser = serverState.currentUser
    localState.messages = [...serverState.messages]

    keyboardListener.registerUsername(serverState.currentUser)
    keyboardListener.subscribe((command) => {
      socket.emit(command.type, command)
    })
    start()
  })
})


socket.on('online change', (online) => {
  setOnline(document, online)
})

socket.on('typing', (data) => {
  if (data.sender !== localState.currentUser) {
    setTyping(document, data.sender)
  }
})


socket.on('chat message', (message, serverOffset) => {
  addMessage(message)
  socket.auth.serverOffset = serverOffset;
})

