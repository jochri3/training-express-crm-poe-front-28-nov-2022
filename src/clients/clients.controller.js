const clientsService = require('./clients.service')

async function findAll(_, res) {
  const clients = await clientsService.findAll()
  res.send(clients)
}

async function findOne(req, res) {
  const id = req.params.id
  try {
    const client = await clientsService.findOne(id)
    res.send(client)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

async function create(req, res) {
  const client = await clientsService.create(req.body)
  res.send(client)
}

async function update(req, res) {
  const id = req.params.id
  const client = await clientsService.update(id, req.body)
  res.send(client)
}

async function remove(req, res) {
  const id = req.params.id
  const client = await clientsService.remove(id)
  res.send(client)
}

async function getOrders({ params: { id } }, res) {
  const orders = await clientsService.getOrders(id)
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
