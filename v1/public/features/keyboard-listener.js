
export function createKeyboardListener(document) {
  const input = document.getElementById('messages-input')
  input.addEventListener('keypress', handleKeypress)

  const state = {
    username: '',
    observers: [],
  }

  function handleKeypress(event) {
    const keyPressed = event.key

    const command = {
      type: 'typing',
      sender: state.username,
    }

    if (keyPressed === 'Enter') {
      if (input.value) {
        command.type = 'chat message'
        command.message = input.value
        input.value = ''
      }
    }
    notifyAll(command)
  }

  function subscribe(observerFunction) {
    state.observers.push(observerFunction)
  }

  function unsubscribe() {
    state.observers = []
  }

  function notifyAll(command) {
    for (const observerFunction of state.observers) {
      observerFunction(command)
    }
  }

  function registerUsername(username) {
    state.username = username
  }

  return {
    subscribe,
    unsubscribe,
    registerUsername
  }

}