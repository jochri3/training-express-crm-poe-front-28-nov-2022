const { ClientSchema } = require('../clients.schema')

function validateClientsBody(request, response, next) {
  for (const attr in request.body) {
    if (!ClientSchema[attr]) {
      delete request.body[attr]
    }
  }

  for (const attr in ClientSchema) {
    if (!request.body[attr]) {
      return response.status(422).send({ cause: 'Data is incomplete' })
    }

    if (typeof request.body[attr] !== ClientSchema[attr]) {
      return response
        .status(422)
        .send({ cause: `${attr} should be of type ${ClientSchema[attr]}` })
    }
  }
  next()
}

module.exports.validateClientsBody = validateClientsBody
