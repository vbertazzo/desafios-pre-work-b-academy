import './style.css'

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

function addMessageToTable (message) {
  const messageElement = document.createElement('p')
  messageElement.textContent = message
  carsTable.appendChild(messageElement)
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

function addCarsToTable (cars) {
  const carElements = document.createDocumentFragment()

  cars.forEach(car => {
    const carRow = createCarRow(car)
    carElements.appendChild(carRow)
  })

  carsTable.appendChild(carElements)
}

fetch('http://localhost:3333/cars')
  .then(result => result.ok && result.json())
  .then(cars => {
    cars.length === 0
      ? addMessageToTable('Nenhum carro encontrado')
      : addCarsToTable(cars)
  })
  .catch(error => {
    console.error('Fetch error: ', error)
  })
