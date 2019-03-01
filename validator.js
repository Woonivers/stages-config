import isString from 'lodash/fp/isString'
import isInteger from 'lodash/fp/isInteger'
import isEmail from 'validator/lib/isEmail'
import isURL from 'validator/lib/isURL'

export const hasValidFormat = (format, value) => {
	if (format === '*') return { isValid: true }
	if (format === 'string')
		return { isValid: isString(value), error: '- must be string' }
	if (format === 'int')
		return { isValid: isInteger(value), error: '- must be integer' }
	if (format === 'email')
		return { isValid: isEmail(value), error: '- must be a email' }
	if (format === 'url')
		return {
			isValid: isURL(value, { require_tld: false }),
			error: '- must be a url',
		}
	return {
		isValid: false,
		error: '- format associated not supported, use a custom validator',
	}
}
