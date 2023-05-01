const express = require('express')
const compression = require('compression')
const { clientsRouter } = require('./clients/clients.routes')
const { ordersRouter } = require('./orders/orders.routes')
const cors = require('cors')
const { Pool } = require('./pool')
const morganMiddleware = require('./middlewares/morgan.middleware')

// The morgan middleware does not need this.
// This is for a manual log
const logger = require('./utils/logger')

require('dotenv').config()

const app = express()
app.use(morganMiddleware)
app.use(express.json())
app.use(cors())
app.use('/clients', clientsRouter)
app.use('/orders', ordersRouter)
app.use(compression())
app.use(errorHandler)

app.get('/api/status', (_, res) => {
  logger.info('Checking the API status: Everything is OK')
  res.status(200).send({
    status: 'UP',
    message: 'The API is up and running!',
  })
})

const PORT = 3000

Pool.connect({
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})
  .then(() => {
    logger.info('Connexion à Postgres établie avec succès.')
    app.listen(PORT, () => {
      logger.info(`Le serveur écoute sur le port ${PORT}.`)
    })
  })
  .catch((err) => {
    logger.error(err)
  })

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  res.status(500).send({ error: err.message, status: 500 })
  logger.error(err)
}
