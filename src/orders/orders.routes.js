const express = require('express')
const { validateOrdersBody } = require('./middlewares/validate-body.middleware')
const ordersController = require('./orders.controller')

const ordersRouter = express.Router()

ordersRouter.get('/', ordersController.findAll)
ordersRouter.get('/:id', ordersController.findOne)
ordersRouter.post('/', validateOrdersBody, ordersController.create)
ordersRouter.put('/:id', validateOrdersBody, ordersController.update)
ordersRouter.delete('/:id', ordersController.remove)

module.exports.ordersRouter = ordersRouter
