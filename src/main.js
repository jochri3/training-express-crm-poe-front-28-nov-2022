const express = require('express')

const database = {
  orders: [
    {
      id: 1,
      typePresta: 'Formation',
      designation: 'Formation React.js',
      clientId: 1,
      nbDays: 8,
      unitPrice: 600,
      totalExcludeTaxe: 4800,
      totalWithTaxe: 5760,
      state: 1,
    },
    {
      id: 2,
      typePresta: 'Dev',
      designation: 'Techlead React.js',
      clientId: 1,
      nbDays: 10,
      unitPrice: 600,
      totalExcludeTaxe: 6000,
      totalWithTaxe: 7200,
      state: 1,
    },
  ],
  clients: [
    {
      id: 1,
      companyName: 'Capg',
      firstName: 'Jordan',
      lastName: 'Lugard',
      email: 'jordan.lugard@capg.com',
      phoneNumber: '+3367676764',
      address: 'Quelque part',
      zipCode: '48334',
      country: 'France',
      state: 0,
    },
    {
      id: 2,
      companyName: 'Netflix',
      firstName: 'Mickael',
      lastName: 'Véril',
      email: 'mika.veril@netflix.com',
      phoneNumber: '+3367676767',
      address: 'New york',
      zipCode: '11111',
      country: 'USA',
      state: 1,
    },
  ],
}

const app = express()

app.get('/clients', (_, response) => {
  response.send(database.clients)
})

app.get('/clients/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const client = database.clients.find((client) => client.id === id)
  // undefined
  // undefined => false
  // ! false => true
  if (!client) {
    return response.status(404).send('Not found')
  }
  response.send(client)
})

app.get('/orders', (_, response) => {
  response.send(database.orders)
})

app.get('/orders/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const orders = database.clients.find((orders) => orders.id === id)
  // undefined
  // undefined => false
  // ! false => true
  if (!orders) {
    return response.status(404).send('Not found')
  }
  response.send(orders)
})

// 1. Lister toutes les prestations pour un client donné.
app.get('/clients/:id/orders', (request, response) => {
  const id = parseInt(request.params.id)
  const client = database.clients.find((client) => client.id === id)
  if (!client) {
    return response.status(404).send('Client not found')
  }
  const orders = database.orders.filter((order) => order.clientId === id)
  response.send(orders)
})

// 2. Supprimer un client ainsi que tous les orders

app.delete('/clients/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const client = database.clients.find((client) => client.id === id)
  // undefined
  // undefined => false
  // ! false => true
  if (!client) {
    return response.status(404).send('Client not found')
  }

  const index = database.clients.findIndex((client) => client.id === id)
  database.clients.splice(index, 1)
  const clientIds = database.orders.filter((_, index) => index)

  clientIds.forEach((id) => database.orders.splice(id, 1))
  response.send(client)
})

// 3. Supprimer un order specifique

app.delete('/orders/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const order = database.clients.find((orders) => orders.id === id)
  // undefined
  // undefined => false
  // ! false => true
  if (!order) {
    return response.status(404).send('Not found')
  }
  const index = database.orders.findIndex((order) => order.id === id)
  database.orders.splice(index, 1)
  response.send(order)
})

//La liste des clients
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}!!!!`)
})
