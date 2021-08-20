export function showErrorMessage (content, form) {
  const message = document.createElement('p')
  message.textContent = content
  message.setAttribute('data-js', 'message')
  message.style.color = 'red'
  form.insertAdjacentElement('afterend', message)
}

export function hideErrorMessage () {
  const message = document.querySelector('[data-js="message"]')
  if (message) {
    message.remove()
  }
}
