const { database } = require('../../database')

function validateOrder(request, response, next) {
  const id = parseInt(request.params.id)
  const order = database.orders.find((order) => order.id === id)

  if (!order) {
    return response.status(404).send('Order not found')
  }

  request.order = order
  next()
}

module.exports.validateOrder = validateOrder
