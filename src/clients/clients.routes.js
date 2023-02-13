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

module.exports.clientsRouter = clientsRouter
