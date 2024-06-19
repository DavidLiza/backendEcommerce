const CODES = require('../utils/codes')
const { isError } = require('../utils/utils')
const userCrudOperations = require('../database/functions/userOperations')

async function createOrder(req) {
  try {
    var userLogged = await userCrudOperations.FindUserWithValidation(req.body.email, req.body.password)
    if (userLogged) {
      switch (userLogged) {
        case 0:
          throw { ...CODES.LTT003, error: 'DB_ERROR - error getting user', status: 500 }
        case 2:
          throw { ...CODES.LTT003, error: 'Invalid password', status: 200 }
        case 3:
          throw { ...CODES.LTT003, error: 'User not found', status: 404 }
        default:
          // let newUser = JSON.parse(JSON.stringify(userLogged))
          // let sessionId = undefined
          // if (sessionExists.length <= 0) {
          //   let sessionCreated = await sessionController.CreateSessionID(newUser)
          //   if (!sessionCreated) {
          //     return 'Unable to create session'
          //   }
          //   sessionId = sessionCreated._id
          // }
          const dataNeed = {
            email: userLogged.email,
            userId: userLogged._id
          }
          return { ...CODES.LTT001, result: { ...dataNeed }, status: 200 }
      }
    } else {
      console.error('User not retunerd')
      throw { ...CODES.LTT000, status: 500 }
    }
  } catch (error) {
    console.error(error.message === undefined ? error : error.message)
    throw error
  }
}

// ***** LOCAL NEEDED FUNCTIONS ******

module.exports = { createOrder }
