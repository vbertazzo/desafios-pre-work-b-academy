const userName = document.querySelector('[data-js="name"]')

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
