const { ClientSchema } = require('../clients.schema')
const { validateAgainstSchema } = require('./validateAgainstSchema')

function validateClientsBody(request, response, next) {
  const cleanedData = {}
  for (const attr in request.body) {
    if (ClientSchema[attr]) {
      cleanedData[attr] = request.body[attr]
    }
  }

  const validationResult = validateAgainstSchema(cleanedData, ClientSchema)
  const errorLength = Object.keys(validationResult.errors).length

  if (errorLength) {
    validationResult.status = 422
    return response.status(422).send(validationResult)
  }

  // On peut utiliser locals pour avoir une approche plus safe
  request.body = cleanedData
  next()
}

module.exports.validateClientsBody = validateClientsBody
