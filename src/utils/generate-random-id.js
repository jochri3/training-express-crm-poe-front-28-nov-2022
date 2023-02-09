function generateRandomId(limit = 1000) {
  return Math.floor(Math.random() * limit) + 1
}

module.exports.generateRandomId = generateRandomId
