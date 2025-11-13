import { isArray, isEmpty } from 'lodash'

export function clearEmptyObjects<T extends Record<string, any>>(
  object: T,
): Partial<T> {
  const cleanedObject: Partial<Record<string, any>> = {}

  Object.keys(object).forEach((key: string) => {
    if (
      object[key] === null ||
      object[key] === undefined ||
      object[key] === 'undefined' ||
      object[key] === '' ||
      object[key] === '[]' ||
      (isArray(object[key]) && isEmpty(object[key]))
    ) {
      return
    }
    cleanedObject[key] = object[key]
  })
  return cleanedObject as Partial<T>
}

export function removeNullObjects<T extends Record<string, any>>(
  object: T,
): Partial<T> {
  const cleanedObject: Partial<Record<string, any>> = {}

  Object.keys(object).forEach((key: string) => {
    if (
      object[key] === null ||
      object[key] === undefined ||
      (isArray(object[key]) && isEmpty(object[key]))
    ) {
      return
    }
    cleanedObject[key] = object[key]
  })
  return cleanedObject as Partial<T>
}

export const isEmptyObject = (obj: any) => {
  // Check if the input is an object and not null
  return (
    obj !== null && typeof obj === 'object' && Object.keys(obj).length === 0
  )
}

export const isJsonString = (str: string): boolean => {
  try {
    if (!str) return false
    if (!isNaN(Number(str))) return false
    JSON.parse(str)

    return true
  } catch (e) {
    return false
  }
}

export function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc?.[part], obj)
}

export function pickKeysWithNull(obj: Record<string, any>, keys: string[]) {
  return keys.reduce(
    (result, key) => ({
      ...result,
      [key]: obj.hasOwnProperty(key) ? obj[key] : null,
    }),
    {},
  )
}

export function getObjectValueByKey(obj: Record<string, any>, key: string) {
  if (obj && typeof obj === 'object' && key in obj) {
    return obj[key]
  }
  return null
}

export const multiplyArray = <T extends any>(
  arr: Array<T>,
  number: number = 1,
) => {
  return Array.from({ length: number }, () => arr).flat()
}
