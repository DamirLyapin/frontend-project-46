import _ from 'lodash'

const formatValue = (value, depth = 1) => {
  const indentSize = 4
  const currentIndent = ' '.repeat(depth * indentSize)
  const bracketIndent = ' '.repeat((depth - 1) * indentSize)

  if (_.isPlainObject(value)) {
    const entries = Object.entries(value)
    const formattedEntries = entries.map(([key, val]) => {
      return `${currentIndent}${key}: ${formatValue(val, depth + 1)}`
    })
    return `{\n${formattedEntries.join('\n')}\n${bracketIndent}}`
  }
  if (typeof value === 'string') {
    return value
  }
  return String(value)
}

export const stylish = (diff, depth = 1) => {
  const indentSize = 4
  const currentIndent = ' '.repeat(depth * indentSize - 2)
  const bracketIndent = ' '.repeat((depth - 1) * indentSize)

  const lines = diff.map((node) => {
    const { key, type } = node

    switch (type) {
    case 'nested':
      return `${currentIndent}  ${key}: ${stylish(node.children, depth + 1)}`

    case 'added':
      return `${currentIndent}+ ${key}: ${formatValue(node.value, depth + 1)}`

    case 'removed':
      return `${currentIndent}- ${key}: ${formatValue(node.value, depth + 1)}`

    case 'changed':
      return [
        `${currentIndent}- ${key}: ${formatValue(node.value1, depth + 1)}`,
        `${currentIndent}+ ${key}: ${formatValue(node.value2, depth + 1)}`,
      ].join('\n')

    case 'unchanged':
      return `${currentIndent}  ${key}: ${formatValue(node.value, depth + 1)}`

    default:
      return ''
    }
  })

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}
