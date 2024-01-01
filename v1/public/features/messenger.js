import { userMessageBox } from "./userMessageBox.js"

export function messenger(document) {
  const state = {
    messages: [{ sender: 'System', value: 'Be polite' }],
    online: 0,
    currentUser: ''
  }

  function start() {
    clearMessages()
    for (const message of state.messages) {
      addMessage(message)
    }
  }

  function addMessage(message) {
    userMessageBox(document).create(message.value, message.sender === state.currentUser ? 'Me' : message.sender)
  }

  function clearMessages() {
    userMessageBox(document).clear()
  }

  return {
    start,
    state,
    addMessage
  }
}