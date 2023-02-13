const express = require('express')
const {
  validateClientsBody,
} = require('./middlewares/validate-body.middleware')
const clientsController = require('./clients.controller')

const clientsRouter = express.Router()

clientsRouter.get('/', clientsController.findAll)
clientsRouter.get('/:id', clientsController.findOne)
clientsRouter.post('/', validateClientsBody, clientsController.create)
clientsRouter.put('/:id', validateClientsBody, clientsController.update)
clientsRouter.get('/:id/orders', clientsController.getOrders)
clientsRouter.delete('/:id', clientsController.remove)

// clientsRouter.patch('/:id', validateClient, (request, response) => {
//   const client = request.client

//   for (const attr in request.body) {
//     client[attr] = request.body[attr]
//   }

//   response.send(client)
// })

// clientsRouter.post('/:id/orders', validateClient, (request, response) => {
//   const clientId = request.client.id

//   const order = { ...request.body, clientId }
//   database.orders.push(order)
//   response.send(order)
// })

module.exports.clientsRouter = clientsRouter
