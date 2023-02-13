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

module.exports = {
  findAll,
  findOne,
  create,
}
