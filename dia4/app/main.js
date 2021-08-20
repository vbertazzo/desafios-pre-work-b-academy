import { addCarToApi, getCarsFromApi } from './api'
import { showErrorMessage, hideErrorMessage } from './utils'

import './style.css'

const form = document.querySelector('[data-js="cars-form"]')
const carsTable = document.querySelector('[data-js="table"]')

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

async function render () {
  const cars = await getCarsFromApi()

  if (!cars) {
    showErrorMessage(
      'Erro ao carregar carros do servidor.  Por favor, tente novamente em breve.',
      form
    )
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

  if (!response) {
    showErrorMessage(
      'Ocorreu um erro ao adicionar o carro. Por favor, tente novamente em breve.',
      form
    )
    return
  }

  if (response.error) {
    showErrorMessage(response.message, form)
    return
  }

  await render()

  e.target.reset()
  getElement('image').focus()
})

await render()
