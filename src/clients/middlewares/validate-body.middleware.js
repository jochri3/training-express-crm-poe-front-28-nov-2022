const { ClientSchema } = require('../clients.schema')

function validateClientsBody(request, response, next) {
  // Check if there are fields that should not be there
  for (const attr in request.body) {
    if (!ClientSchema[attr]) {
      delete request.body[attr]
    }
  }

  const error = {
    errors: {},
    status: null,
  }

  for (const attr in ClientSchema) {
    if (
      !request.body[attr] ||
      typeof request.body[attr] !== ClientSchema[attr]
    ) {
      error.errors[
        attr
      ] = `${attr} cannot be empty or should be a ${ClientSchema[attr]}`
    }
  }
  const errorLength = Object.keys(error.errors).length
  if (errorLength) {
    error.status = 422
    return response.status(422).send(error)
  }
  next()
}

module.exports.validateClientsBody = validateClientsBody
