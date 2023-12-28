let typingTimeoutID = null

export function setTyping(document, sender) {
  const typingDiv = document.getElementById('typing')
  const typingMessage = document.getElementById('typing-message')


  typingMessage.textContent = `${sender} está digitando`
  typingDiv.style.display = 'block'

  if (typingTimeoutID !== null) {
    clearTimeout(typingTimeoutID);
  }

  typingTimeoutID = setTimeout(() => {
    typingDiv.style.display = 'none'
    typingTimeoutID = null
  }, 1000);
}