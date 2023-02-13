const clientsService = require('./clients.service')

async function findAll(_, res) {
  const clients = await clientsService.findAll()
  res.send(clients)
}

async function findOne(req, res) {
  const id = req.params.id
  let { includeOrders } = req.query
  includeOrders = includeOrders || ''
  try {
    const client = await clientsService.findOne(id, includeOrders)

    res.send(client)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

async function create(req, res, next) {
  try {
    const client = await clientsService.create(req.body)
    res.send(client)
  } catch (error) {
    next(error)
  }
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
