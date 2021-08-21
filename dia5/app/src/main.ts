import './style.css'
import { get, post, del } from './http'

const url = 'http://localhost:3333/cars'
const form = document.querySelector('[data-js="cars-form"]')
const table = document.querySelector('[data-js="table"]')

const getFormElement = (event: Event) => (elementName: string) => {
  const target = event.target as HTMLFormElement
  return target.elements.namedItem(elementName) as HTMLInputElement
}

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor
}

type ElementType = keyof typeof elementTypes
type ElementValue = {
  src: string
  alt: string
} & string

function createImage(data: { src: string; alt: string }) {
  const td = document.createElement('td')
  const img = document.createElement('img')
  img.src = data.src
  img.alt = data.alt
  img.width = 100
  td.appendChild(img)
  return td
}

function createText(value: string) {
  const td = document.createElement('td')
  td.textContent = value
  return td
}

function createColor(value: string) {
  const td = document.createElement('td')
  const div = document.createElement('div')
  div.style.width = '100px'
  div.style.height = '100px'
  div.style.background = value
  td.appendChild(div)
  return td
}

form?.addEventListener('submit', async e => {
  e.preventDefault()
  const getElement = getFormElement(e)
  const image = getElement('image')

  const data = {
    image: image.value,
    brandModel: getElement('brand-model').value,
    year: getElement('year').value,
    plate: getElement('plate').value,
    color: getElement('color').value
  }

  const result = await post(url, data)

  if (result.error) {
    console.log('deu erro na hora de cadastrar', result.message)
    return
  }

  const noContent = document.querySelector('[data-js="no-content"]')
  if (noContent) {
    table?.removeChild(noContent)
  }

  createTableRow(data)

  const target = e.target as HTMLFormElement
  target.reset()
  image.focus()
})

type CarProps = {
  image: string
  brandModel: string
  year: string
  plate: string
  color: string
}

function createTableRow(data: CarProps) {
  const elements = [
    { type: 'image', value: { src: data.image, alt: data.brandModel } },
    { type: 'text', value: data.brandModel },
    { type: 'text', value: data.year },
    { type: 'text', value: data.plate },
    { type: 'color', value: data.color }
  ]

  const tr = document.createElement('tr')
  tr.dataset.plate = data.plate

  elements.forEach(element => {
    const elementType = element.type as ElementType
    const elementValue = element.value as ElementValue
    const td = elementTypes[elementType](elementValue)
    tr.appendChild(td)
  })

  const button = document.createElement('button')
  button.textContent = 'Excluir'
  button.dataset.plate = data.plate

  button.addEventListener('click', handleDelete)

  tr.appendChild(button)

  table?.appendChild(tr)
}

async function handleDelete(e: Event) {
  const button = e.target as HTMLButtonElement
  const plate = button?.dataset.plate

  const result = await del(url, { plate })

  if (result.error) {
    console.log('erro ao deletar', result.message)
    return
  }

  const tr = document.querySelector(`tr[data-plate="${plate}"]`)
  if (tr === null) {
    return
  }

  table?.removeChild(tr)
  button?.removeEventListener('click', handleDelete)

  const allTrs = table?.querySelector('tr')
  if (!allTrs) {
    createNoCarRow()
  }
}

function createNoCarRow() {
  const tr = document.createElement('tr')
  const td = document.createElement('td')
  const thsLength = document.querySelectorAll('table th').length
  td.setAttribute('colspan', `${thsLength}`)
  td.textContent = 'Nenhum carro encontrado'

  tr.dataset.js = 'no-content'
  tr.appendChild(td)
  table?.appendChild(tr)
}

async function main() {
  const result = await get(url)

  if (result.error) {
    console.log('Erro ao buscar carros', result.message)
    return
  }

  if (result.length === 0) {
    createNoCarRow()
    return
  }

  result.forEach(createTableRow)
}

main()
