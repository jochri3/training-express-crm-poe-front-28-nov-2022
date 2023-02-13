const clientsRepository = require('./clients.repository')
const ordersService = require('../orders/orders.service')

async function findAll() {
  const clients = await clientsRepository.findAll()
  return clients
}

async function findOne(id, includeOrders) {
  const client = await clientsRepository.findOne(id)
  if (!client) {
    throw new Error('client not found')
  }
  if (includeOrders.toLowerCase() === 'true') {
    const orders = await ordersService.findByClient(id)
    return { ...client, orders }
  }
  return client
}

async function create(createClientBody) {
  const existingUser = await clientsRepository.findOneBy({
    email: createClientBody.email,
  })
  if (existingUser) {
    throw new Error(`Email ${createClientBody.email} already in use`)
  }
  const client = await clientsRepository.create(createClientBody)
  return client
}

// Ajouter des vérifications
async function update(id, updateClientBody) {
  await findOne(id)
  const client = await clientsRepository.update(id, updateClientBody)
  return client
}

// Ajouter des vérifications
async function remove(id) {
  await findOne(id)
  const client = await clientsRepository.remove(id)
  return client
}

// Ajouter des vérifications
async function getOrders(id) {
  await findOne(id)
  const orders = await clientsRepository.getOrders(id)
  return orders
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
  getOrders,
}
