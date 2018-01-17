const { resolve } = require('path')
const applyEnv = require('./apply-env.js')
const isModuleMissing = require('./module.js')

/**
 * Apply the environment variables from `./package.json`
 * @param  {Object}  secrets  Map of secrets
 * @param  {Object}  required Map of required values
 * @return {Boolean}          If the environment variables were applied
 */
function loadPkgJSON(secrets = {}, required = {}) {
  const PKG_PATH = resolve('./package.json')

  try {
    const pkgFile = require(PKG_PATH)

    if (pkgFile.now && pkgFile.now.env) {
      applyEnv(pkgFile.now.env, secrets, required)
    }

    return true
  } catch (error) {
    if (isModuleMissing(error)) {
      return false
    }
    throw error
  }
}

module.exports = loadPkgJSON
