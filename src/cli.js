import { Command } from 'commander'
import parseFile from './parsers.js'
import genDiff from './index.js'

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    try {
      const options = program.opts()
      const format = options.format
      const diff = genDiff(filepath1, filepath2, format)
      console.log(diff)
    } catch (e) {
      console.error(`Error: ${e.message}`)
      process.exit(1)
    }
  })

export default program
