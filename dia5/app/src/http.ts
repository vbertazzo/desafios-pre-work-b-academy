const request = (url: RequestInfo, options?: RequestInit) =>
  fetch(url, options)
    .then(r => r.json())
    .catch(e => ({ error: true, message: e.message }))

const createRequest = (method: string) => (url: RequestInfo, data: unknown) => request(url, {
  method,
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify(data)
})

export const get = (url: RequestInfo) => request(url)
export const post = createRequest('POST')
export const del = createRequest('DELETE')
