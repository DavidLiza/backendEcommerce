const codes = require('./codes')
const { validationResult } = require('express-validator')

//   _  _ ___ _    ___ ___ _   _ _      ___ _   _ _  _  ___ _____ ___ ___  _  _ ___
//  | || | __| |  | _ \ __| | | | |    | __| | | | \| |/ __|_   _|_ _/ _ \| \| / __|
//  | __ | _|| |__|  _/ _|| |_| | |__  | _|| |_| | .` | (__  | |  | | (_) | .` \__ \
//  |_||_|___|____|_| |_|  \___/|____| |_|  \___/|_|\_|\___| |_| |___\___/|_|\_|___/

// *************** HELPER FUNCIONTS ******************//
function getHeaders(form) {
  return new Promise((resolve, reject) => {
    form.getLength((err, length) => {
      if (err) {
        reject(err);
      }
      let headers = Object.assign(
        { "Content-Length": length },
        form.getHeaders()
      );
      resolve(headers);
    });
  });
}

function isNull(value) {
  return value === null
}

function isUndefined(value) {
  return value === undefined
}

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isString(value) {
  return typeof value === 'string'
}

function isFunction(value) {
  return typeof value === 'function'
}

function isError(value) {
  switch (Object.prototype.toString.call(value)) {
    case '[object Error]':
      return true
    case '[object Exception]':
      return true
    case '[object DOMException]':
      return true
    default:
      return value instanceof Error
  }
}

function checkInput(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ ...codes.KEC002, error: errors.array() })
  }
  next()
}

function errorHandler(err, _req, res, _next) {
  const { status, name, ...data } = err
  return res.status(status).send(data)
}

module.exports = {
  getHeaders,
  isNull,
  isUndefined,
  isObject,
  isString,
  isFunction,
  isError,
  checkInput,
  errorHandler
}

