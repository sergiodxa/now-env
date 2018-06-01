'use strict'

const loadSecrets = require('./lib/load-secrets.js')
const loadRequired = require('./lib/load-required.js')

const loadNowJSON = require('./lib/load-now-json.js')
const loadPkgJSON = require('./lib/load-pkg-json.js')

/**
 * Check if is running inside Now.sh and apply variables and secrets to `process.env`
 */
function config() {
  // only run this if it's not running inside Now.sh
  if (Boolean(process.env.NOW)) return

  const secrets = loadSecrets()
  const required = loadRequired()

  // load environment variables from now.json
  const hasLoaded = loadNowJSON(secrets, required)

  // if now.json doesn't exists
  if (!hasLoaded) {
    // load from package.json
    loadPkgJSON(secrets, required)
  }
}

// run
config()
