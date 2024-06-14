const express = require('express')
const { checkInput, errorHandler } = require('../utils/utils.js')
// const moment = require('moment')

var baseController = require('../controllers/baseController.js')

const { query, body, oneOf, header } = require('express-validator')

const router = express.Router()
// ***************** CONSTANTS ******************

// **************** ERROR CATCH *****************
process.on('uncaughtException', function (err) {
  console.error('ERROR KEC-ROUTES: ' + err)
})

// **************** ROUTES FUNCTIONS *****************
async function servRoute(req, res, next) {
  try {
    const result = await baseController.servTest(req)
    return res.status(200).send(result)
  } catch (error) {
    return next(error)
  }
}

// **************** ROUTES *****************

router.post(
  '/api/serv',
  body('id').notEmpty().withMessage('Missing Parameter: id'),
  body('id', 'Parameter: "id" should be a COLOMBIAN Identification Number')
    .if(body('id').exists())
    .isNumeric()
    .isLength({ min: 5, max: 10 }),

  checkInput,
  servRoute,
  errorHandler
)

//  __   ___   _    ___ ___   _ _____ ___ ___  _  _   _____  _____
//  \ \ / /_\ | |  |_ _|   \ /_\_   _|_ _/ _ \| \| | | __\ \/ / __|
//   \ V / _ \| |__ | || |) / _ \| |  | | (_) | .` | | _| >  <\__ \
//    \_/_/ \_\____|___|___/_/ \_\_| |___\___/|_|\_| |___/_/\_\___/

// // body('docDate', 'Missing Parameter: docDate').notEmpty(),
// // body('docDate', 'The docDate field must be array dd/mm/YYYY' ).if(body('docDate').notEmpty()).matches(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/) ,

// // body('email'  , 'Missing Parameter: email').notEmpty(),
// // body('email'  , 'Must be a string of a correct email ')
// // .if(body('email').notEmpty()).matches(/^[A-Za-z0-9+_.-]+@(.+)+[a-zA-Z]{2,6}$/),

// // body('celular', 'Missing Parameter: celular').notEmpty() ,
// // body('celular', 'Parameter: celular should be a COLOMBIAN phone Number' ).
// // if(body('celular').notEmpty()).isNumeric().isLength({min: 10, max:10}),

// // // ONE OF

// // body('user', 'Missing Parameter: user').notEmpty(),
// // oneOf([
// //     [
// //         body('user.firstName').notEmpty(),
// //         body('user.lastName' ).notEmpty()
// //     ],
// //     body('user.completeName' ).notEmpty()
// // ],
// // { message: 'Missing Parameter in user : (firstName and lastName) or completeName' }),

// // oneOf([header('x-jwt').exists(), body('jwt').exists()], { message: 'Missing Parameter: x-jwt(header) or jwt(body)' })

// // // OPTIONALS
// // body('city'   , 'Parameter city must be a String').isString().optional({nullable: true}),
// // body('signB64', 'Parameter signB64 must be a base64 Image').isBase64().optional({nullable: true}),
// // body('user.phone' , 'Parameter user.phone must be a Numeric').isNumeric().optional({nullable: true}),
// // body('signature.signPage'  , 'Parameter signature.signPage must be a String').isNumeric().optional({nullable: true}),

// // STOP VALIDATION WHEN SOMETHING FAILED

// // query('fecha_inicio', 'Missing Parameter: fecha_inicio').exists(),
// // query('fecha_fin', 'Missing Parameter: fecha_fin').exists().bail(),
// // query().custom(checkDate)

// // function checkDate(value) {
// //     const startDateFormat1 = moment(value.fecha_inicio, 'YYYY-MM-DD', true)
// //     const endDateFormat1 = moment(value.fecha_fin, 'YYYY-MM-DD', true)
// //     const startDateFormat2 = moment(value.fecha_inicio, 'YYYY-MM-DDTHH:mm:ss.SSS', true)
// //     const endDateFormat2 = moment(value.fecha_fin, 'YYYY-MM-DDTHH:mm:ss.SSS', true)

// //     const isValidFormat1 = startDateFormat1.isValid() && endDateFormat1.isValid()
// //     const isValidFormat2 = startDateFormat2.isValid() && endDateFormat2.isValid()

// //     if (
// //       (startDateFormat1.isValid() && endDateFormat2.isValid()) ||
// //       (startDateFormat2.isValid() && endDateFormat1.isValid())
// //     ) {
// //       throw new Error('Dates should not overlap between formats.')
// //     }
// //     if (!isValidFormat1 && !isValidFormat2) {
// //       throw new Error('Invalid date format. The date format must be YYYY-MM-DD HH:mm:ss.SSS or YYYY-MM-DD')
// //     }
// //     if (startDateFormat1.isAfter(endDateFormat1) || startDateFormat2.isAfter(endDateFormat2)) {
// //       throw new Error('fecha_inicio must be before fecha_fin.')
// //     }

// //     return true
// // }

module.exports = router
