export function registerToggleConnectionListener(document, socket) {
  const toggleButton = document.getElementById('toggle-btn');

  toggleButton.addEventListener('click', (e) => {
    e.preventDefault()
    if (socket.connected) {
      toggleButton.innerText = 'Connect';
      socket.disconnect()
    } else {
      toggleButton.innerText = 'Disconnect';
      socket.connect()
    }
  })
}