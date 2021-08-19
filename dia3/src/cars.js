const carForm = document.querySelector('[data-js="car-form"')
const carTable = document.querySelector('[data-js="car-table"')

const formField = event => name => event.target.elements[name].value

carForm.addEventListener('submit', e => {
  e.preventDefault()

  const getValue = formField(e)
  const newCar = {
    image: getValue('image'),
    brand: getValue('brand'),
    year: getValue('year'),
    plate: getValue('plate'),
    color: getValue('color')
  }

  addCarRowToTable(newCar, carTable)
  carForm.reset()

  const imageField = document.querySelector('[data-js="image-input"')
  imageField.focus()
})

const addCarRowToTable = (car, table) => {
  const carTableRow = table.insertRow(-1)

  const imageCell = carTableRow.insertCell(0)
  const imageLink = document.createElement('a')
  imageLink.textContent = 'Imagem'
  imageLink.href = car.image
  imageCell.insertAdjacentElement('beforeend', imageLink)

  const brandCell = carTableRow.insertCell(1)
  brandCell.textContent = car.brand

  const yearCell = carTableRow.insertCell(2)
  yearCell.textContent = car.year

  const plateCell = carTableRow.insertCell(3)
  plateCell.textContent = car.plate

  const colorCell = carTableRow.insertCell(4)
  colorCell.textContent = car.color
}
