import './style.css'

const userName = document.querySelector('[data-js="name"]')
const form = document.querySelector('[data-js="form"')

const shouldCapitalizeWord = word => {
  const exceptions = ['de', 'da', 'do', 'dos']
  return !exceptions.includes(word)
}

const capitalizeWord = word => {
  const lowerCaseWord = word.toLowerCase()
  return shouldCapitalizeWord(lowerCaseWord)
    ? lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1)
    : lowerCaseWord
}

userName.addEventListener('input', e => {
  const words = e.target.value.split(' ')
  e.target.value = words.map(word => capitalizeWord(word)).join(' ')
})

const createColorContainer = colors => {
  const colorElements = colors.map(color => {
    const square = document.createElement('div')
    square.className = 'square'
    square.style.backgroundColor = color

    return square
  })

  const colorContainer = document.createElement('div')

  for (const element of colorElements) {
    colorContainer.insertAdjacentElement('beforeend', element)
  }

  return colorContainer
}

const createColorSelect = colors => {
  const colorSelect = document.createElement('select')
  colorSelect.setAttribute('data-js', 'select')
  colorSelect.setAttribute('multiple', '')

  for (const color of colors) {
    const option = document.createElement('option')
    option.setAttribute('value', color)
    option.textContent = color

    colorSelect.insertAdjacentElement('beforeend', option)
  }

  colorSelect.addEventListener('change', e => {
    const newColorContainer = createColorContainer(
      [...e.target.selectedOptions].map(option => option.value)
    )
    colorSection.innerHTML = ''
    colorSection.insertAdjacentElement('beforeend', newColorContainer)
  })

  return colorSelect
}

const COLORS = ['red', 'yellow', 'green', 'blue', 'violet']
const colorSelect = createColorSelect(COLORS)
form.insertAdjacentElement('beforeend', colorSelect)

const colorSection = document.createElement('section')
form.insertAdjacentElement('beforeend', colorSection)
