import './style.css'

const form = document.querySelector('[data-js="cars-form"]')
const carsTable = document.querySelector('[data-js="table"]')

const URL = 'http://localhost:3333/cars'

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor
}

function createImage (value) {
  const td = document.createElement('td')
  const image = document.createElement('img')
  image.src = value
  image.width = 100
  td.appendChild(image)
  return td
}

function createText (value) {
  const td = document.createElement('td')
  td.textContent = value
  return td
}

function createColor (value) {
  const td = document.createElement('td')
  const div = document.createElement('div')
  div.style.height = '20px'
  div.style.width = '20px'
  div.style.backgroundColor = value
  td.appendChild(div)
  return td
}

function createCarRow (car) {
  const elements = [
    { type: 'image', value: car.image },
    { type: 'text', value: car.brandModel },
    { type: 'text', value: car.year },
    { type: 'text', value: car.plate },
    { type: 'color', value: car.color }
  ]

  const tr = document.createElement('tr')
  elements.forEach(element => {
    const td = elementTypes[element.type](element.value)
    tr.appendChild(td)
  })

  return tr
}

function showErrorMessage (content) {
  const message = document.createElement('p')
  message.textContent = content
  message.setAttribute('data-js', 'message')
  message.style.color = 'red'
  form.insertAdjacentElement('afterend', message)
}

function hideErrorMessage () {
  const message = document.querySelector('[data-js="message"]')
  if (message) {
    message.remove()
  }
}

function addMessageToTable (message) {
  const messageElement = document.createElement('p')
  messageElement.textContent = message
  carsTable.appendChild(messageElement)
}

function addCarsToTable (cars) {
  const carElements = document.createDocumentFragment()

  cars.forEach(car => {
    const carRow = createCarRow(car)
    carElements.appendChild(carRow)
  })

  carsTable.appendChild(carElements)
}

async function addCarToApi (car) {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(car)
    })
    const data = await response.json()

    return data
  } catch (error) {
    console.log('Erro ao adicionar carro:', error)
    showErrorMessage(
      'Erro ao adicionar carro. Por favor, tente novamente em instantes.'
    )

    return
  }
}

async function getCarsFromApi () {
  try {
    const response = await fetch(URL)
    const data = await response.json()

    return data
  } catch (error) {
    console.log('Erro ao carregar carros:', error)
    showErrorMessage('Erro ao carregar carros do servidor.')

    return
  }
}

async function render () {
  const cars = await getCarsFromApi()

  if (!cars) {
    return
  }

  if (cars.length === 0) {
    addMessageToTable('Nenhum carro encontrado')

    return
  }

  carsTable.innerHTML = ''
  addCarsToTable(cars)
}

const getFormElement = event => name => event.target.elements[name]

form.addEventListener('submit', async e => {
  e.preventDefault()
  hideErrorMessage()

  const getElement = getFormElement(e)
  const newCar = {
    image: getElement('image').value,
    brandModel: getElement('brand-model').value,
    year: getElement('year').value,
    plate: getElement('plate').value,
    color: getElement('color').value
  }

  const response = await addCarToApi(newCar)

  if (response.error) {
    showErrorMessage(response.message)
    return
  }

  await render()

  e.target.reset()
  getElement('image').focus()
})

await render()
