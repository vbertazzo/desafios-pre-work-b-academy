const URL = 'http://localhost:3333/cars'

export async function addCarToApi (car) {
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

    return
  }
}

export async function getCarsFromApi () {
  try {
    const response = await fetch(URL)
    const data = await response.json()

    return data
  } catch (error) {
    console.log('Erro ao carregar carros:', error)

    return
  }
}

export async function removeCarFromApi (plate) {
  try {
    const response = await fetch(URL, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ plate })
    })
    const data = await response.json()

    return data
  } catch (error) {
    console.log('Erro ao remover carro:', error)

    return
  }
}
