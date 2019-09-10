const { resolve } = require('path')
const findUp = require('find-up')
const isModuleMissing = require('./module.js')

/**
 * Load the environment secrets from `./now-secrets.json`
 * @return {Object} Map of secrets
 */
function loadSecrets() {
  const SECRET_PATH = findUp.sync('now-secrets.json') || resolve('./now-secrets.json')

  try {
    return require(SECRET_PATH)
  } catch (error) {
    if (isModuleMissing(error)) {
      return {}
    }
    throw error
  }
}

module.exports = loadSecrets
