import { Command } from 'commander';
import parseFile from './index.js';

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

const genDiff = (data1, data2) => {
  let result = '{\n'
  const sortedData1 = sortFiles(data1)
  const sortedData2 = sortFiles(data2)
  const allKeys = [
    ...new Set([
      ...Object.keys(sortedData1),
      ...Object.keys(sortedData2)
    ])
  ].sort()
  allKeys.forEach(key => {
    const value1 = sortedData1[key]
    const value2 = sortedData2[key]
    if (value1 !== undefined && value2 !== undefined) {
      if (value1 === value2) {
        result += `  ${key}: ${value1}\n`
      } else {
        result += `- ${key}: ${value1}\n`
        result += `+ ${key}: ${value2}\n`
      }
    } else if (value1 !== undefined) {
      result += `- ${key}: ${value1}\n`
    } else {
      result += `+ ${key}: ${value2}\n`
    }
  })
  result += '}'
  return result
}

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    try {
      const file1 = parseFile(filepath1)
      const file2 = parseFile(filepath2)
      console.log(genDiff(file1, file2))
    } catch(e) {
      console.error(`Error: ${e.message}`)
    }
  });

export default program