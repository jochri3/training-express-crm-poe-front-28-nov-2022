const express = require('express')
const { Pool } = require('../pool')

// const { database } = require('../database')
// const { validateOrder } = require('./middlewares/validate-orders.middleware')

const ordersRouter = express.Router()

ordersRouter.get('/', async (_, response) => {
  const { rows } = await Pool.query('SELECT * FROM orders')
  response.send(rows)
})

ordersRouter.get(
  '/:id',
  /*validateOrder,*/ async (request, response) => {
    const id = request.params.id
    const { rows } = await Pool.query('SELECT * FROM orders WHERE id=$1', [id])
    response.send(rows[0])
  },
)

ordersRouter.delete(
  '/:id',
  /*validateOrder,*/ async (request, response) => {
    const id = request.params.id
    const { rows } = await Pool.query(
      'DELETE FROM orders WHERE id=$1 RETURNING *',
      [id],
    )
    response.send(rows[0])
  },
)

module.exports.ordersRouter = ordersRouter
