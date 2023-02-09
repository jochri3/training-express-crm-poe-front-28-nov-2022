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
// app.use(bodyParser)

app.get('/clients', (_, response) => {
  response.send(database.clients)
})

app.get('/clients/:id', validateClient, (request, response) => {
  const client = request.client
  response.send(client)
})

app.get('/orders', (_, response) => {
  response.send(database.orders)
})

app.get('/orders/:id', validateOrder, (request, response) => {
  const order = request.order
  response.send(order)
})

// 1. Lister toutes les prestations pour un client donné.
app.get('/clients/:id/orders', validateClient, (request, response) => {
  const client = request.client
  const orders = database.orders.filter((order) => order.clientId === client.id)
  response.send(orders)
})

// 2. Supprimer un client ainsi que tous les orders

app.delete('/clients/:id', validateClient, (request, response) => {
  const client = request.client
  const clientId = request.client.id

  const index = database.clients.findIndex((client) => client.id === clientId)
  database.clients.splice(index, 1)
  const clientIds = database.orders.filter((_, index) => index)

  clientIds.forEach((id) => database.orders.splice(id, 1))
  response.send(client)
})

app.post('/clients', bodyParser, (request, response) => {
  const data = { ...request.body, id: generateRandomId() }
  database.clients.push(data)
  response.send('Création effectuée avec succès')
})

app.patch('/clients/:id', bodyParser, validateClient, (request, response) => {
  const client = request.client

  for (const attr in request.body) {
    client[attr] = request.body[attr]
  }

  response.send(client)
})

app.post(
  '/clients/:id/orders',
  bodyParser,
  validateClient,
  (request, response) => {
    const clientId = request.client.id

    const order = { ...request.body, clientId }
    database.orders.push(order)
    response.send(order)
  },
)

// 3. Supprimer un order specifique

app.delete('/orders/:id', validateOrder, (request, response) => {
  const order = request.order
  const orderId = order.id
  const index = database.orders.findIndex((order) => order.id === orderId)
  database.orders.splice(index, 1)
  response.send(order)
})

//La liste des clients
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}!!!!`)
})

function bodyParser(request, response, next) {
  let body = ''
  request.on('data', (chunk) => {
    body += chunk.toString()
  })

  request.on('end', () => {
    try {
      const data = JSON.parse(body)
      request.body = data
      next()
    } catch (e) {
      response.status(400).send(`Erreur survenue${e}`)
    }
  })
}

function generateRandomId(limit = 1000) {
  return Math.floor(Math.random() * limit) + 1
}

function validateClient(request, response, next) {
  const id = parseInt(request.params.id)
  const client = database.clients.find((client) => client.id === id)

  if (!client) {
    return response.status(404).send('Client not found')
  }

  request.client = client
  next()
}

function validateOrder(request, response, next) {
  const id = parseInt(request.params.id)
  const order = database.orders.find((order) => order.id === id)

  if (!order) {
    return response.status(404).send('Order not found')
  }

  request.order = order
  next()
}

function validateResource(name) {
  return function (request, response, next) {
    const id = parseInt(request.params.id)
    const ressource = database[name].find((ressource) => ressource.id === id)

    if (!ressource) {
      return response.status(404).send(`${name} not found`)
    }

    request[name] = ressource
    next()
  }
}

// Modifer un client
// - Créer une route PATCH pour modifier partiellement un client
// - Créer un order pour un client spécifique
