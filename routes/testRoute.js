const express = require('express')
const { checkInput, errorHandler } = require('../utils/utils')
const codes = require('../utils/codes')

const router = express.Router()

function test(req, res, next) {
  try {
    return res.status(200).send(codes.KEC100)
  } catch (err) {
    return err
  }
}

router.get('/api/test', test, errorHandler)

module.exports = router
