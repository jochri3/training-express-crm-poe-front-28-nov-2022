const express = require('express')
// const { validateClient } = require('./middlewares/validate-client.middleware')
const { Pool } = require('../pool')
const {
  validateClientsBody,
} = require('./middlewares/validate-body.middleware')

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

clientsRouter.get(
  '/:id/orders' /*, validateClient*/,
  async (request, response) => {
    const id = request.params.id
    const { rows } = await Pool.query(
      'SELECT * FROM orders WHERE client_id = $1',
      [id],
    )
    return response.send(rows[0])
  },
)

// 2. Supprimer un client ainsi que tous les orders

clientsRouter.delete('/:id' /*, validateClient*/, async (request, response) => {
  const id = request.params.id
  const { rows } = await Pool.query(
    `
      DELETE FROM clients
      WHERE id=$1
      RETURNING first_name,last_name, company_name,email
    `,
    [id],
  )

  return response.send(rows[0])
})

clientsRouter.post('/', validateClientsBody, async ({ body }, response) => {
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

clientsRouter.put('/:id', async ({ body, params }, response) => {
  const id = params.id
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

  const { rows } = await this.pool.query(
    `
        UPDATE clients
        SET 
            company_name=$1,
            first_name=$2,
            last_name=$3,
            email=$4,
            phone_number=$5,
            address=$6,
            zip_code=$7,
            country=$8,
            state=$9
        WHERE id=$10
        RETURNING id,first_name,last_name,company_name,email
      `,
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
      id,
    ],
  )
  return response.send(rows[0])
})

// clientsRouter.patch('/:id', validateClient, (request, response) => {
//   const client = request.client

//   for (const attr in request.body) {
//     client[attr] = request.body[attr]
//   }

//   response.send(client)
// })

// clientsRouter.post('/:id/orders', validateClient, (request, response) => {
//   const clientId = request.client.id

//   const order = { ...request.body, clientId }
//   database.orders.push(order)
//   response.send(order)
// })

module.exports.clientsRouter = clientsRouter
