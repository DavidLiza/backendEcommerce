#!/usr/bin/env node
const process = require('node:process')
const mongoose = require('mongoose')
const config = require('./../config/config.json')[process.env.NODE_ENV || 'development']

const conUrl = `${config.database.connectionType}://${config.database.user}:${config.database.password}@${config.database.url}`

// ------------- FUNCTION DEFINITION  ---------------
const connect = () => {
  mongoose.set('strictQuery', false)
  const db = mongoose.connection

  db.on('connecting', function () {
    console.info('connecting to MongoDB...')
  })

  db.on('error', function (error) {
    console.info('Error in MongoDb connection: ' + error)
    mongoose.disconnect()
  })

  db.on('connected', function () {
    console.info('MongoDB connected!')
  })

  db.once('open', function () {
    console.info('MongoDB connection opened!')
  })

  db.on('reconnected', function () {
    console.info('MongoDB reconnected!')
  })

  db.on('disconnected', function () {
    console.info('MongoDB disconnected!')
    mongoose.connect(conUrl, {
      maxPoolSize: 50
    })
  })

  mongoose.connect(conUrl, {
    maxPoolSize: 50
  })
}

const gracefulExit = async () => {
  try {
    await mongoose.connection.close()
    console.info('Mongoose default connection with DB is disconnected through app termination')
    process.exit(0)
  } catch (err) {
    utils.error('Error during graceful exit: ', err)
    process.exit(1)
  }
}

module.exports = { connect, gracefulExit }
