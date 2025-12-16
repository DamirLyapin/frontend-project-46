import _ from 'lodash'

export const genDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2))
  const sortedKeys = _.sortBy(keys)
  return sortedKeys.map((key) => {
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key]}
    }
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key]}
    }
    const value1 = data1[key]
    const value2 = data2[key]
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key, 
        type: 'nested',
        children: genDiff(value1, value2)
      }
    }
    if (!_.isEqual(value1, value2)) {
      return {
        key,
        type: 'changed',
        value1,
        value2
      }
    }
    return { key, type: 'unchanged', value: value1}
  })
}

