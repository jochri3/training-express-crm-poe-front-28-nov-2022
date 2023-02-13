const OrderSchema = Object.freeze({
  typePresta: 'string',
  designation: 'string',
  clientId: 'number',
  nbDays: 'number',
  unitPrice: 'number',
  state: 'number',
})

module.exports.OrderSchema = OrderSchema
