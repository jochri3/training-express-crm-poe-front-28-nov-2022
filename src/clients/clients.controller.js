const clientsRepository = require('./clients.repository')

async function findAll(_, res) {
  const clients = await clientsRepository.findAll()
  res.send(clients)
}

async function findOne(req, res) {
  const id = req.params.id
  const client = await clientsRepository.findOne(id)
  res.send(client)
}

async function create(req, res) {
  const client = await clientsRepository.create(req.body)
  res.send(client)
}

async function update(req, res) {
  const id = req.params.id
  const client = await clientsRepository.update(id, req.body)
  res.send(client)
}

async function remove(req, res) {
  const id = req.params.id
  const client = await clientsRepository.remove(id)
  res.send(client)
}

async function getOrders({ params: { id } }, res) {
  const orders = await clientsRepository.getOrders(id)
  res.send(orders)
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
  getOrders,
}
