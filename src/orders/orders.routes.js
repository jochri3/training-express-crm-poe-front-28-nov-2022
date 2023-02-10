const express = require('express')
const { database } = require('../database')
const { validateOrder } = require('./middlewares/validate-orders.middleware')

const ordersRouter = express.Router()

ordersRouter.get('/', (_, response) => {
  response.send(database.orders)
})

ordersRouter.get('/:id', validateOrder, (request, response) => {
  const order = request.order
  response.send(order)
})

ordersRouter.delete('/:id', validateOrder, (request, response) => {
  const order = request.order
  const orderId = order.id
  const index = database.orders.findIndex((order) => order.id === orderId)
  database.orders.splice(index, 1)
  response.send(order)
})

module.exports.ordersRouter = ordersRouter
