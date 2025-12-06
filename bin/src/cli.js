import { Command } from 'commander'
import genDiff from './index.js'
const program = new Command()

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .argument('<filepath1>', 'path to first file')
    .argument('<filepath2>', 'path to second file')
    .action((filepath1, filepath2) => {
        const diff = genDiff(filepath1, filepath2);
        console.log(diff);
    })
export { program }