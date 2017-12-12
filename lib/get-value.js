/**
 * Get the secret value
 * @param  {String} key          The secret key
 * @param  {Object} [secrets={}] The secrets map
 * @return {String}              The secret value
 */
function getSecretValue(key, secrets = {}) {
  // check if the value is in the secret map
  const value = secrets[key]
  // if is defined return the secret
  if (value !== undefined) return value
  // try get the secret value without @ from the map
  return secrets[key.slice(1)]
}

/**
 * Get the value of a environment variable or secret
 * @param  {Object} env      Map of environment variables
 * @param  {Object} secrets  Map of secrets
 * @param  {Object} required Map of required values
 * @param  {String} key      The environment key name
 * @return {String}          The environment value
 */
function getValue(key, env, secrets = {}, required = {}) {
  let value
  if (required.hasOwnProperty(key)) {
    // get required value
    value = required[key]
  } else if (env.hasOwnProperty(key)){
    // get environment value
    value = env[key]
  } else {
    // if the value is not defined throw an error
    throw new ReferenceError(`The environment variable ${key} is required.`)
  }

  // if the value doesn't start with @ (it's not a secret) return it
  if (`${value}`.indexOf('@') !== 0) return value
  // try get the secret secret or return the value
  const secretValue = getSecretValue(value, secrets)
  return secretValue !== undefined ? secretValue : value

}

module.exports = getValue
