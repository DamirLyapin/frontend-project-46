import _ from 'lodash'

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]'
  }

  if (typeof value === 'string') {
    return `'${value}'`
  }

  if (value === null) {
    return 'null'
  }

  return String(value)
}

const buildPath = (currentPath, key) => {
  return currentPath ? `${currentPath}.${key}` : key
}

const iter = (diff, path = '') => {
  const lines = diff.flatMap((node) => {
    const { key, type } = node
    const propertyPath = buildPath(path, key)

    switch (type) {
    case 'nested':
      return iter(node.children, propertyPath)

    case 'added':
      return `Property '${propertyPath}' was added with value: ${formatValue(node.value)}`

    case 'removed':
      return `Property '${propertyPath}' was removed`

    case 'changed':
      return `Property '${propertyPath}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`

    case 'unchanged':
      return []

    default:
      return []
    }
  })

  return lines
}

export const plain = (diff) => {
  const result = iter(diff)
  return result.join('\n')
}
