/**
 * Get the value of a environment variable or secret
 * @param  {Object} env      Map of environment variables
 * @param  {Object} secrets  Map of secrets
 * @param  {Object} required Map of required values
 * @param  {String} key      The environment key name
 * @return {String}          The environment value
 */
module.exports = (key, env, secrets = {}, required = {}) => {
  let value

  if (required.hasOwnProperty(key)) {
    // Get required value
    value = required[key]
  } else if (env.hasOwnProperty(key)){
    // Get environment value
    value = env[key]
  } else {
    // If the value is not defined throw an error
    throw new ReferenceError(`The environment variable ${key} is required.`)
  }

  // If the value doesn't start with @ (it's not a secret) return it
  if (`${value}`.indexOf('@') !== 0) {
    return value
  }

  // Otherwise, hand back the secret. This will
  // intentionally return `undefined` if the secret
  // is not defined so that the
  // developers knows it is not defined.
  return secrets[value]
}
