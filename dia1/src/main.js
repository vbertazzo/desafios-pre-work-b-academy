import './style.css'

const app = document.querySelector('[data-js="app"]')
app.innerHTML = `
<h1>B. Academy</h1>
<p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`
const visibilityButton = document.querySelector('[data-js="toggle-visibility"')

const toggleContentVisibility = () => {
  app.style.display = app.style.display === 'none' ? 'block' : 'none'
  app.style.display === 'none'
    ? (visibilityButton.textContent = 'Mostrar conteúdo')
    : (visibilityButton.textContent = 'Esconder conteúdo')
}

visibilityButton.addEventListener('click', toggleContentVisibility, false)
