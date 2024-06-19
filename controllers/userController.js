const CODES = require('../utils/codes')
const { isError } = require('../utils/utils')
const userCrudOperations = require('../database/functions/userOperations')
// const config = require('../config/config.json')[process.env.NODE_ENV || 'development']
// const { requestCallRest } = require('../utils/requestCall')

async function userLogin(req) {
  try {
    // Sessions Not implemented So ...
    // let sessionReboked = await userCrudOperations.sessionController.RevokeSessionId(req.body)
    // if (!sessionReboked) {
    //   throw { ...CODES.LTT003, error: 'Session Not Found', status: 404 }
    // } else if (sessionReboked.length == 0) {
    //   throw { ...CODES.LTT003, error: 'Session Not Found', status: 404 }
    // } else {
    //   return { ...CODES.LTT001, result: { loggedOut: true }, status: 200 }
    // }

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

async function userLogout(req) {
  try {
    var userExists = await userCrudOperations.getBase(req.body.userId)
    return { ...CODES.LTT001, result: { loggedOut: true }, status: 200 }

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
          let newUser = JSON.parse(JSON.stringify(userLogged))
          // let sessionId = undefined
          // if (sessionExists.length <= 0) {
          //   let sessionCreated = await sessionController.CreateSessionID(newUser)
          //   if (!sessionCreated) {
          //     return 'Unable to create session'
          //   }
          //   sessionId = sessionCreated._id
          // }
          let dataNeed = {
            email: newUser.email,
            userId: newUser._id
          }
          return dataNeed
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

async function userRegister(req) {
  try {
    var userCreated = await userCrudOperations.createUser(req.body)
    if (userCreated?.userCreated) {
      return { ...CODES.LTT001, result: { userCreated: true }, status: 200 }
    } else {
      throw {
        ...CODES.LTT000,
        error: userCreated?.errmsg ? userCreated.errmsg : 'Unkown Error',
        status: userCreated?.errmsg ? 400 : 500
      }
    }
  } catch (error) {
    console.error(error.message === undefined ? error : error.message)
    throw error
  }
}

// ***** LOCAL NEEDED FUNCTIONS ******

module.exports = { userLogin, userLogout, userRegister }
