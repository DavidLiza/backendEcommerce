const axios = require('axios')
const buffer = require('node:buffer').Buffer

const soapRequest = require('easy-soap-request')
const https = require('node:https')
// Create a custom agent to bypass SSL certificate verification
const agent = new https.Agent({
  rejectUnauthorized: false
})

const keyToRemove = ['accept', 'accept-encoding', 'connection', 'host'] //  'content-length', 'content-type',

async function requestCallRest(url, endpoint, method, data, header = {}) {
  try {
    for (const key of keyToRemove) {
      if (Object.prototype.hasOwnProperty.call(header, key)) {
        delete header[key]
      }
    }
    const configAxios = {
      method,
      url: url + endpoint,
      responseType: 'json',
      responseEncoding: 'utf8',
      headers: {
        ...header
      },
      data
    }

    return await axios(configAxios)
  } catch (error) {
    throw error
  }
}

module.exports = {
  requestCallRest
}
