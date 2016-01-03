'use strict'
const axios = require('axios')
const URL = 'http://dbug.mx'
const BUS_ID = '1021'

module.exports = {
  setLevel: (data) => {
  const PATH = '/bus/' + BUS_ID

  axios.post(URL + PATH, data)
    .then((response) => {
      console.log(response.data)
    })
    .catch((response) => {
      console.log('Error', response)
    })
  }
}
