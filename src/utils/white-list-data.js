function whiteList(data, schema) {
  const whiteListed = { ...data }
  for (const attr in whiteListed) {
    if (!schema[attr]) {
      delete whiteListed[attr]
    }
  }
  return whiteListed
}

module.exports.whiteList = whiteList
