module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'no-unused-vars': 'error',
    camelcase: 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
  },
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
  },
}
