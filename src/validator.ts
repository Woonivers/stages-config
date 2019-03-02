import * as _ from 'lodash/fp'
import * as validator from 'validator'

export default (format, value) => {
  if (format === '*') return { isValid: true }
  if (format === 'string')
    return { isValid: _.isString(value), error: '- must be string' }
  if (format === 'int')
    return { isValid: _.isInteger(value), error: '- must be integer' }
  if (format === 'email')
    return { isValid: validator.isEmail(value), error: '- must be a email' }
  if (format === 'url')
    return {
      isValid: validator.isURL(value, { require_tld: false }),
      error: '- must be a url'
    }
  return {
    isValid: false,
    error: '- format associated not supported, use a custom validator'
  }
}
