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

module.exports = {
  findAll,
  findOne,
}
