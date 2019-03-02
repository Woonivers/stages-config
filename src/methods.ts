import { hasParam, isParam, getValue, formatValidator } from './helpers'

export const get = ({ schema, values }): ((path: string) => {}) => (
  path
): string => {
  if (!hasParam(schema, path)) throw new Error(`Cannot find param '${path}'`)
  if (!isParam(schema, path))
    throw new Error(
      `Cannot get params with children '${path}' - Select the child directly`
    )
  const value = getValue(schema, path, values)
  const { isValid, error } = formatValidator(schema, path, value)
  if (!isValid) throw new Error(`'${path}' ${error}`)

  return value
}
