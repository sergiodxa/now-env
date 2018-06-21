const { resolve } = require('path')
const applyEnv = require('./apply-env.js')
const isModuleMissing = require('./module.js')

/**
 * Apply the environment variables from `./now.json`
 * @param  {Object}  secrets  Map of secrets
 * @param  {Object}  required Map of required values
 * @return {Boolean}          If the environment variables were applied
 */
function loadNowJSON(secrets = {}, required = {}) {
  const NOW_PATH = resolve(process.env.NOW_CONFIG || './now.json')

  try {
    const nowFile = require(NOW_PATH)

    if (nowFile.env) {
      applyEnv(nowFile.env, secrets, required)
    }

    return true
  } catch (error) {
    if (isModuleMissing(error)) {
      return false
    }
    throw error
  }
}

module.exports = loadNowJSON
