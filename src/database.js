const database = {
  orders: [
    {
      id: 1,
      typePresta: 'Formation',
      designation: 'Formation React.js',
      clientId: 1,
      nbDays: 8,
      unitPrice: 600,
      totalExcludeTaxe: 4800,
      totalWithTaxe: 5760,
      state: 1,
    },
    {
      id: 2,
      typePresta: 'Dev',
      designation: 'Techlead React.js',
      clientId: 1,
      nbDays: 10,
      unitPrice: 600,
      totalExcludeTaxe: 6000,
      totalWithTaxe: 7200,
      state: 1,
    },
  ],
  clients: [
    {
      id: 1,
      companyName: 'Capg',
      firstName: 'Jordan',
      lastName: 'Lugard',
      email: 'jordan.lugard@capg.com',
      phoneNumber: '+3367676764',
      address: 'Quelque part',
      zipCode: '48334',
      country: 'France',
      state: 0,
    },
    {
      id: 2,
      companyName: 'Netflix',
      firstName: 'Mickael',
      lastName: 'Véril',
      email: 'mika.veril@netflix.com',
      phoneNumber: '+3367676767',
      address: 'New york',
      zipCode: '11111',
      country: 'USA',
      state: 1,
    },
  ],
}

module.exports.database = database
