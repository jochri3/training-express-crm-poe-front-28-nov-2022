const { Pool } = require('../pool')

async function findAll() {
  const { rows } = await Pool.query('SELECT * FROM clients')
  return rows
}

async function findOne(id) {
  const { rows } = await Pool.query('SELECT * FROM clients WHERE id=$1', [id])
  return rows[0]
}

async function create(clientBody) {
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
  } = clientBody
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

module.exports = {
  findAll,
  findOne,
  create,
}
