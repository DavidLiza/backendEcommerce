const CODES = require('../utils/codes')
const { isError } = require('../utils/utils')
const userCrudOperations = require('../database/functions/userOperations')
const orderOperations = require('../database/functions/orderOperations')

async function createOrder(req) {
  try {
    const queryUser = `ObjectId("${req.body.userId}")`
    const userLogged = await userCrudOperations.getBase(queryUser)
    const orederCreated = await orderOperations.getBase(queryUser)
    if (!userLogged) throw { ...CODES.LTT003, error: 'User not found', status: 404 }
  } catch (error) {
    console.error(error.message === undefined ? error : error.message)
    throw error
  }
}

// ***** LOCAL NEEDED FUNCTIONS ******

module.exports = { createOrder }
