const ordersRepository = require('./orders.repository')
const clientsService = require('../clients/clients.service')

async function create(createOrderData) {
  const clientId = createOrderData.clientId
  await clientsService.findOne(clientId)
  return ordersRepository.create(createOrderData)
}

//  Terminer l'implémentation du service
// Non trouvé 404
// Erreur généric 400

module.exports = {
  create,
}
