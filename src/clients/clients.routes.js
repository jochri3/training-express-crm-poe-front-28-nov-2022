const express = require('express')
const { database } = require('../database.js')
const { validateClient } = require('./middlewares/validate-client.middleware')
const { Pool } = require('../pool')

const clientsRouter = express.Router()

clientsRouter.get('/', async (_, response) => {
  const { rows } = await Pool.query('SELECT * FROM clients')
  response.send(rows)
})

clientsRouter.get('/:id' /*, validateClient*/, async (request, response) => {
  const id = request.params.id
  const { rows } = await Pool.query('SELECT * FROM clients WHERE id=$1', [id])
  response.send(rows[0])
})

clientsRouter.get('/:id/orders', validateClient, (request, response) => {
  const client = request.client
  const orders = database.orders.filter((order) => order.clientId === client.id)
  response.send(orders)
})

// 2. Supprimer un client ainsi que tous les orders

clientsRouter.delete('/:id', validateClient, (request, response) => {
  const client = request.client
  const clientId = request.client.id

  const index = database.clients.findIndex((client) => client.id === clientId)
  database.clients.splice(index, 1)
  const clientIds = database.orders.filter((_, index) => index)

  clientIds.forEach((id) => database.orders.splice(id, 1))
  response.send(client)
})

clientsRouter.post('/', async ({ body }, response) => {
  const {
    companyName,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    zipCode,
    country,
    state,
  } = body
  const { rows } = await Pool.query(
    `INSERT INTO clients(company_name,first_name,last_name,email,phone_number,address,zip_code,country,state) 
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [
      companyName,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      zipCode,
      country,
      state,
    ],
  )

  response.send(rows[0])
})

clientsRouter.patch('/:id', validateClient, (request, response) => {
  const client = request.client

  for (const attr in request.body) {
    client[attr] = request.body[attr]
  }

  response.send(client)
})

clientsRouter.post('/:id/orders', validateClient, (request, response) => {
  const clientId = request.client.id

  const order = { ...request.body, clientId }
  database.orders.push(order)
  response.send(order)
})

module.exports.clientsRouter = clientsRouter
