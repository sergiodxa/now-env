const { resolve } = require('path')
const isModuleMissing = require('./module.js')

/**
 * Load the environment required values from `./now-required.json`
 * @return {Object} Map of required values
 */
function loadRequired() {
  const REQUIRED_PATH = resolve('./now-required.json')

  try {
    return require(REQUIRED_PATH)
  } catch (error) {
    if (isModuleMissing(error)) {
      return {}
    }
    throw error
  }
}

module.exports = loadRequired
