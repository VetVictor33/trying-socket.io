
export function createKeyboardListener(document, state, socket) {
  const input = document.getElementById('messages-input')

  input.addEventListener('keypress', handleKeypress)

  function handleKeypress(event) {
    const keyPressed = event.key

    if (keyPressed === 'Enter') {
      if (input.value) {
        socket.emit('chat message', { message: input.value, sender: socket.id })
        input.value = ''
      }
    }
  }
}