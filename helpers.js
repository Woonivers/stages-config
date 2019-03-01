import _ from 'lodash/fp'
import { hasValidFormat } from './validator'

const getFromValues = (stages, path) => _.get(path, stages)

const getFromEnv = (schema, path) => {
	const env = _.get(`${path}.env`, schema)
	return process.env[env] // eslint-disable-line no-process-env
}

const getFromDefault = (schema, path) => _.get(`${path}.default`, schema)

export const getValue = (schema, path, values) =>
	getFromValues(values, path) ||
	getFromEnv(schema, path) ||
	getFromDefault(schema, path)

export const hasParam = (schema, path) => _.hasIn(path, schema)

export const isParam = (schema, path) =>
	!Object.values(_.get(path, schema)).some(value => _.isObject(value))

export const formatValidator = (schema, path, value) => {
	const format = _.get(`${path}.format`, schema)
	if (!format) return { isValid: true }
	return hasValidFormat(format, value)
}

export const customValidator = (schema, path, value) => {
	const validator = _.get(`${path}.validator`, schema)
	if (validator && !validator(value)) {
		throw new Error(`${path} - custom validator has fail`)
	}
}
