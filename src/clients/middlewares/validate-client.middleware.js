const { database } = require('../../database')

function validateClient(request, response, next) {
  const id = parseInt(request.params.id)
  const client = database.clients.find((client) => client.id === id)

  if (!client) {
    return response.status(404).send('Client not found')
  }

  request.client = client
  next()
}

module.exports.validateClient = validateClient
