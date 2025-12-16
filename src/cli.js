import { Command } from 'commander'
import parseFile from './parsers.js'
import { genDiff } from './index.js'
import { stylish } from './formaters.js'

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    try {
      const file1 = parseFile(filepath1)
      const file2 = parseFile(filepath2)
      const diff = genDiff(file1, file2)
      const options = program.opts()
      const format = options.format
      let result
      if (format === 'stylish') {
        result = stylish(diff)
      } else {
        result = stylish(diff)
      }
      console.log(result)
    }
    catch (e) {
      console.error(`Error: ${e.message}`)
      process.exit(1)
    }
  })

export default program
