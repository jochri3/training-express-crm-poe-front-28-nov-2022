const ordersRepository = require('./orders.repository')
const clientsService = require('../clients/clients.service')

function findAll() {
  return ordersRepository.findAll()
}

async function findOne(id) {
  const order = await ordersRepository.findOne(id)
  if (!order) {
    throw new Error('Order not found')
  }
  return order
}

async function create(createOrderData) {
  const clientId = createOrderData.clientId
  await clientsService.findOne(clientId)
  return ordersRepository.create(createOrderData)
}

async function remove(id) {
  await findOne(id)
  return ordersRepository.remove(id)
}

async function update(id, updateOrderBody) {
  await findOne(id)
  const order = await ordersRepository.update(id, updateOrderBody)
  return order
}

async function findByClient(id) {
  return ordersRepository.findByClient(id)
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
  findByClient,
}
