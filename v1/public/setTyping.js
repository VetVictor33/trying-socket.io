export function setTyping(document, sender) {
  const typingDiv = document.getElementById('typing')
  const typingMessage = document.getElementById('typing-message')

  typingMessage.textContent = `${sender} está digitando`
  typingDiv.style.display = 'block'

  setTimeout(() => {
    typingDiv.style.display = 'none'
  }, 5000)
}