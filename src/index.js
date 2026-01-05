import _ from 'lodash'
import getFormatter from '../formatters/index.js'
import parseFile from './parsers.js'

const buildDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2))
  const sortedKeys = _.sortBy(keys)

  return sortedKeys.map((key) => {
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key] }
    }

    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] }
    }

    const value1 = data1[key]
    const value2 = data2[key]

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildDiff(value1, value2),
      }
    }

    if (!_.isEqual(value1, value2)) {
      return {
        key,
        type: 'changed',
        value1,
        value2,
      }
    }

    return { key, type: 'unchanged', value: value1 }
  })
}

export const genDiff = (data1, data2, formatName = 'stylish') => {
  const file1 = parseFile(data1)
  const file2 = parseFile(data2)
  const diff = buildDiff(file1, file2)
  const formatter = getFormatter(formatName)
  return formatter(diff)
}

export default genDiff
