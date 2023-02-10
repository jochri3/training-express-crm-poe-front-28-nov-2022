const express = require('express')
const { clientsRouter } = require('./clients/clients.routes')
const { ordersRouter } = require('./orders/orders.routes')
const { Pool } = require('pg')

const app = express()
app.use('/clients', clientsRouter)
app.use('/orders', ordersRouter)

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'crm-backend-poe-front-28-nov-2022',
  user: 'christianlisangola',
  password: '1234',
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
