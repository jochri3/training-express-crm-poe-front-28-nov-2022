const { OrderSchema } = require('../orders.schema')

function validateOrdersBody(request, response, next) {
  for (const attr in request.body) {
    if (!OrderSchema[attr]) {
      delete request.body[attr]
    }
  }

  const error = {
    errors: {},
    status: null,
  }

  for (const attr in OrderSchema) {
    if (
      !request.body[attr] ||
      typeof request.body[attr] !== OrderSchema[attr]
    ) {
      error.errors[
        attr
      ] = `${attr} cannot be empty or should be a ${OrderSchema[attr]}`
    }
  }
  const errorLength = Object.keys(error.errors).length
  if (errorLength) {
    error.status = 422
    return response.status(422).send(error)
  }
  next()
}

module.exports.validateOrdersBody = validateOrdersBody
