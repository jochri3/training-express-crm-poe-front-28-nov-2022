const { Pool } = require('../pool')

async function findAll() {
  const { rows } = await Pool.query('SELECT * FROM clients')
  return rows
}

async function findOne(id) {
  const { rows } = await Pool.query('SELECT * FROM clients WHERE id=$1', [id])
  return rows[0]
}

async function create(clientClientData) {
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
  } = clientClientData
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

  return rows[0]
}

async function update(id, updateClientData) {
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
  } = updateClientData

  const { rows } = await Pool.query(
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
  return rows[0]
}

async function remove(id) {
  await Pool.query(
    `
      DELETE FROM orders
      WHERE client_id=$1
    `,
    [id],
  )
  const { rows } = await Pool.query(
    `
      DELETE FROM clients
      WHERE id=$1
      RETURNING first_name,last_name, company_name,email
    `,
    [id],
  )

  return rows[0]
}

async function getOrders(id) {
  const { rows } = await Pool.query(
    'SELECT * FROM orders WHERE client_id = $1',
    [id],
  )
  return rows
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
  getOrders,
}
