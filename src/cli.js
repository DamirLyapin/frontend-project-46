import { Command } from 'commander';
import parseFile from './index.js';

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
      console.log(`File 1: ${file1}`)
      console.log(`File 2: ${file2}`)
    } catch(e) {
      console.error(`Error: ${e.message}`)
    }
  });

export default program