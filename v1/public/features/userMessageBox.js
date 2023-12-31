export function userMessageBox(document) {
  const messagesBox = document.getElementById('messages-field')

  const userMessageBox = document.createElement('div')
  userMessageBox.classList.add('message-box')

  function create(message, sender) {

    const userMessage = document.createElement('p')
    userMessage.innerText = message

    const userName = document.createElement('span')
    userName.innerText = sender


    userMessageBox.appendChild(userName)
    userMessageBox.appendChild(document.createElement('hr'))
    userMessageBox.appendChild(userMessage)

    if (sender === 'Me') {
      userMessageBox.classList.add('me')
    }

    messagesBox.insertBefore(userMessageBox, messagesBox.firstChild);
  }

  function clear() {
    messagesBox.innerHTML = ''
  }

  return {
    create,
    clear
  }

}