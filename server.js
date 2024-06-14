const cors = require('cors')
const http = require('http')
const express = require('express')
const process = require('node:process')

const config = require('./config/config.json')[process.env.NODE_ENV || 'development']

const testRoute = require('./routes/testRoute')
const userRoute = require('./routes/userRoute')
const orderRoute = require('./routes/orderRoute')

// --- VARIABLES ---
const app = express()

if (process.env.NODE_ENV === 'production') {
  console.info('PRODUCTION')
} else if (process.env.NODE_ENV === 'qa') {
  console.info('QA')
} else {
  console.info('DEVELOPMENT')
}

app.disable('x-powered-by')
app.use(express.json({ limit: '500mb' }))
app.use(express.urlencoded({ limit: '500mb', extended: true }))
app.use(cors())

app.use('/', testRoute)
app.use('/api/node/login', userRoute)
app.use('/api/node/order', orderRoute)

// ***** HTTP SERVER *****
const server = http.createServer(app).listen(config.server.http.port, () => {
  console.info(`Server listening on port ${server.address().port}`)
  console.info(`Worker ${process.pid} started`)
})

if (config.database.init) {
  var dataBase = require('./utils/database')
  dataBase.connect()
  process.on('SIGINT', dataBase.gracefulExit).on('SIGTERM', dataBase.gracefulExit)
}

exports = app
