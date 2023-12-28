import { createUserMessageBox } from "./createUserMessageBox.js"

export function messenger(document) {
  const state = {
    messages: [{ sender: 'System', value: 'Be polite' }],
    online: 0,
    currentUser: ''
  }

  function start() {
    for (const message of state.messages) {
      addMessage(message)
    }
  }

  function addMessage(message) {
    createUserMessageBox(document, message.value, message.sender === state.currentUser ? 'Me' : message.sender)
  }

  return {
    start,
    state,
    addMessage,
  }
}