const sortFiles = (file) => {
  const entries = Object.entries(file)
  const sortedEntries = entries.sort((a, b) => {
    if (a[0] < b[0]) {
      return -1
    }
    if (a[0] > b[0]) {
      return 1
    }
    return 0
  })
  return Object.fromEntries(sortedEntries)
}

export const genDiff = (data1, data2) => {
  let result = '{\n'
  const sortedData1 = sortFiles(data1)
  const sortedData2 = sortFiles(data2)
  const allKeys = [
    ...new Set([
      ...Object.keys(sortedData1),
      ...Object.keys(sortedData2),
    ]),
  ].sort()
  allKeys.forEach((key) => {
    const value1 = sortedData1[key]
    const value2 = sortedData2[key]
    if (value1 !== undefined && value2 !== undefined) {
      if (value1 === value2) {
        result += `  ${key}: ${value1}\n`
      }
      else {
        result += `- ${key}: ${value1}\n`
        result += `+ ${key}: ${value2}\n`
      }
    }
    else if (value1 !== undefined) {
      result += `- ${key}: ${value1}\n`
    }
    else {
      result += `+ ${key}: ${value2}\n`
    }
  })
  result += '}'
  return result
}

