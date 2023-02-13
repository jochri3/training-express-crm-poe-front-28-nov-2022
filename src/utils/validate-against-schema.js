function validateAgainstSchema(data, schema) {
  const error = {
    errors: {},
    status: null,
  }

  for (const attr in schema) {
    if (!data[attr] || typeof data[attr] !== schema[attr]) {
      error.errors[
        attr
      ] = `${attr} cannot be empty or should be a ${schema[attr]}`
    }
  }

  return error
}

module.exports.validateAgainstSchema = validateAgainstSchema
