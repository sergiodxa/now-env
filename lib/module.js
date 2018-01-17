/**
 * Check to see if a module is missing by examining the error code
 * @return {Boolean} If module is missing
 */
function isModuleMissing(error) {
  return error.code === 'MODULE_NOT_FOUND' ||
    error.code === 'ERR_MISSING_MODULE'
}

module.exports = isModuleMissing;
