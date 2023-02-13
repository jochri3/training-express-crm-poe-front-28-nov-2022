const { Pool } = require('../pool')

async function findAll() {
  const { rows } = await Pool.query('SELECT * FROM orders')
  return rows
}

async function findOne(id) {
  const { rows } = await Pool.query('SELECT * FROM orders WHERE id=$1', [id])
  return rows[0]
}

async function remove(id) {
  const { rows } = await Pool.query(
    'DELETE FROM orders WHERE id=$1 RETURNING *',
    [id],
  )
  return rows[0]
}

async function create(createOrderData) {
  const { typePresta, designation, clientId, nbDays, unitPrice, state } =
    createOrderData
  const { rows } = await Pool.query(
    `INSERT INTO orders(type_presta,designation,client_id,nb_days,unit_price,state) 
    VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
    [typePresta, designation, clientId, nbDays, unitPrice, state],
  )

  return rows[0]
}

async function update(id, updateOrderData) {
  const { typePresta, designation, clientId, nbDays, unitPrice, state } =
    updateOrderData
  const { rows } = await Pool.query(
    `UPDATE orders SET type_presta=$1 ,designation=$2,client_id=$3,nb_days=$4,unit_price=$5,state=$6 WHERE id=$7 RETURNING *`,
    [typePresta, designation, clientId, nbDays, unitPrice, state, id],
  )

  return rows[0]
}

async function findByClient(id) {
  const { rows } = await Pool.query(`SELECT * FROM orders WHERE client_id=$1`, [
    id,
  ])
  return rows
}

module.exports = {
  findAll,
  findOne,
  remove,
  create,
  update,
  findByClient,
}
