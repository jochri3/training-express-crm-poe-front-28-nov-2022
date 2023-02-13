const clientsRepository = require('./clients.repository')

async function findAll() {
  const clients = await clientsRepository.findAll()
  return clients
}

async function findOne(id) {
  const client = await clientsRepository.findOne(id)
  if (!client) {
    throw new Error('client not found')
  }
  return client
}

async function create(createClientBody) {
  const client = await clientsRepository.create(createClientBody)
  return client
}

// Ajouter des vérifications
async function update(id, updateClientBody) {
  const client = await clientsRepository.update(id, updateClientBody)
  return client
}

// Ajouter des vérifications
async function remove(id) {
  const client = await clientsRepository.remove(id)
  return client
}

// Ajouter des vérifications
async function getOrders(id) {
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
