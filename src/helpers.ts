import * as _ from 'lodash/fp'
import hasValidFormat from './validator'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFromValues = (stages, path): any => _.get(path, stages)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFromEnv = (schema, path): any => {
  const env = _.get(`${path}.env`, schema)
  return process.env[env]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFromDefault = (schema, path): any => _.get(`${path}.default`, schema)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getValue = (schema, path, values): any =>
  getFromValues(values, path) ||
  getFromEnv(schema, path) ||
  getFromDefault(schema, path)

export const hasParam = (schema, path): boolean => !!_.hasIn(path, schema)

export const isParam = (schema, path): boolean =>
  !Object.values(_.get(path, schema)).some(value => _.isObject(value))

export const formatValidator = (
  schema,
  path,
  value
): { isValid: boolean; error?: string } => {
  const format = _.get(`${path}.format`, schema)
  if (!format) return { isValid: true }
  return hasValidFormat(format, value)
}

export const customValidator = (schema, path, value): void => {
  const validator = _.get(`${path}.validator`, schema)
  if (validator && !validator(value)) {
    throw new Error(`${path} - custom validator has fail`)
  }
}
