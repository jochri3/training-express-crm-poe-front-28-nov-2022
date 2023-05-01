const { OrderSchema } = require('../orders.schema')
const { validateAgainstSchema } = require('./validateAgainstSchema')

function validateOrdersBody(request, response, next) {
  const cleanedData = {}
  for (const attr in request.body) {
    if (OrderSchema[attr]) {
      cleanedData[attr] = request.body[attr]
    }
  }

  const validationResult = validateAgainstSchema(cleanedData, OrderSchema)
  const errorLength = Object.keys(validationResult.errors).length

  if (errorLength) {
    validationResult.status = 422
    return response.status(422).send(validationResult)
  }

  request.body = cleanedData
  next()
}

module.exports.validateOrdersBody = validateOrdersBody
