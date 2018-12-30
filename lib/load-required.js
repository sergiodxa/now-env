const { resolve } = require('path')
const findUp = require('find-up')
const isModuleMissing = require('./module.js')

/**
 * Load the environment required values from `./now-required.json`
 * @return {Object} Map of required values
 */
function loadRequired() {
  const REQUIRED_PATH = findUp.sync('now-required.json') || resolve('./now-required.json')

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
