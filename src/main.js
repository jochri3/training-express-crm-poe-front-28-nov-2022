const express = require('express')
const { clientsRouter } = require('./clients/clients.routes')
const { ordersRouter } = require('./orders/orders.routes')
const cors = require('cors')
const { Pool } = require('./pool')

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())
app.use('/clients', clientsRouter)
app.use('/orders', ordersRouter)
app.use(errorHandler)

const PORT = 3000

Pool.connect({
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})
  .then(() => {
    console.log('Connexion à Postgres établie avec succès.')
    app.listen(PORT, () => {
      console.log(`Le serveur écoute sur le port ${PORT}.`)
    })
  })
  .catch((err) => {
    console.error(err)
  })

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  res.status(500).send({ error: err.message, status: 500 })
}
