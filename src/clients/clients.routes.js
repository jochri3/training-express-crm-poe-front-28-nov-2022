const express = require('express')
const { database } = require('../database.js')
const { validateClient } = require('./middlewares/validate-client.middleware')
const { bodyParser } = require('../middlewares/body-parser')
const { generateRandomId } = require('../utils/generate-random-id')

const clientsRouter = express.Router()

clientsRouter.get('/', (_, response) => {
  response.send(database.clients)
})

clientsRouter.get('/:id', validateClient, (request, response) => {
  const client = request.client
  response.send(client)
})

clientsRouter.get('/:id/orders', validateClient, (request, response) => {
  const client = request.client
  const orders = database.orders.filter((order) => order.clientId === client.id)
  response.send(orders)
})

// 2. Supprimer un client ainsi que tous les orders

clientsRouter.delete('/:id', validateClient, (request, response) => {
  const client = request.client
  const clientId = request.client.id

  const index = database.clients.findIndex((client) => client.id === clientId)
  database.clients.splice(index, 1)
  const clientIds = database.orders.filter((_, index) => index)

  clientIds.forEach((id) => database.orders.splice(id, 1))
  response.send(client)
})

clientsRouter.post('/', bodyParser, (request, response) => {
  const data = { ...request.body, id: generateRandomId() }
  database.clients.push(data)
  response.send('Création effectuée avec succès')
})

clientsRouter.patch('/:id', bodyParser, validateClient, (request, response) => {
  const client = request.client

  for (const attr in request.body) {
    client[attr] = request.body[attr]
  }

  response.send(client)
})

clientsRouter.post(
  '/:id/orders',
  bodyParser,
  validateClient,
  (request, response) => {
    const clientId = request.client.id

    const order = { ...request.body, clientId }
    database.orders.push(order)
    response.send(order)
  },
)

module.exports.clientsRouter = clientsRouter
