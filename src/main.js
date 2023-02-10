const express = require('express')
const { clientsRouter } = require('./clients/clients.routes')
const { ordersRouter } = require('./orders/orders.routes')

const app = express()
app.use('/clients', clientsRouter)
app.use('/orders', ordersRouter)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}!!!!`)
})
