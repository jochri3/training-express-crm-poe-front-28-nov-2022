const ordersRepository = require('./orders.repository')
const clientsService = require('../clients/clients.service')

async function create(createOrderData) {
  const clientId = createOrderData.clientId
  await clientsService.findOne(clientId)
  return ordersRepository.create(createOrderData)
}

module.exports = {
  create,
}
