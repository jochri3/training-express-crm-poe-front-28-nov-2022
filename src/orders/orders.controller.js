const ordersRepository = require('./orders.repository')
const ordersService = require('./orders.service')

async function findAll(_, res) {
  const orders = await ordersRepository.findAll()
  res.send(orders)
}

async function findOne({ params: { id } }, res) {
  const order = await ordersRepository.findOne(id)
  res.send(order)
}

async function remove({ params: { id } }, res) {
  const order = await ordersRepository.remove(id)
  res.send(order)
}

async function create({ body }, res) {
  try {
    const order = await ordersService.create(body)
    res.send(order)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

async function update({ body, params: { id } }, res) {
  const order = await ordersRepository.update(id, body)
  res.send(order)
}

module.exports = {
  findAll,
  findOne,
  remove,
  create,
  update,
}
