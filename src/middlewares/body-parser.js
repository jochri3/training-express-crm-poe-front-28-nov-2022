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

module.exports.bodyParser = bodyParser
