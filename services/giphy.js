const request = require('request')

const GIPHY_RANDOM_ENDPOINT = 'http://api.giphy.com/v1/gifs/random'
const DEV_API_KEY = 'fxW9Fqwfqb7XVWfINFH5dzGcGhcPPVSI'

const queryGiphy = (endpoint, params) => {
  const { tag = '' } = params
  const url = `${endpoint}?tag=${encodeURIComponent(tag)}&api_key=${DEV_API_KEY}`
  return new Promise((resolve, reject) => {
    request(url, { json: true }, (error, httpResponse, json) => {
      if (error) {
        return reject(new Error(`Giphy request error: ${error.message}`))
      }
      if (String(httpResponse.statusCode).search(/^2/) !== 0) {
        return reject(new Error(`Giphy http error: ${httpResponse.statusCode}`))
      }
      if (json.errorMessages && json.errorMessages.length > 0) {
        return reject(new Error(`Giphy response error: ${json.errorMessages.join(' - ')}`))
      }
      resolve(json)
    })
  })
}

module.exports = {
  queryGiphy,
  GIPHY_RANDOM_ENDPOINT,
}
