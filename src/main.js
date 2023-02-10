const express = require('express')
const { clientsRouter } = require('./clients/clients.routes')
const { ordersRouter } = require('./orders/orders.routes')
const { Pool } = require('pg')

require('dotenv').config()

const app = express()
app.use('/clients', clientsRouter)
app.use('/orders', ordersRouter)

const pool = new Pool({
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

const PORT = 3000

pool
  .query('SELECT 1+1')
  .then(() => {
    console.log('Connexion à Postgres établie avec succès.')
    app.listen(PORT, () => {
      console.log(`Le serveur écoute sur le port ${PORT}.`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
