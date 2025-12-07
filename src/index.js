import { readFileSync } from 'fs'
import path from 'path'

const getFormat = (filepath) => {
  const formatWithDot = path.extname(filepath).toLowerCase()
  return formatWithDot.slice(1)
}

const parseFile = (filepath) => {
  const absoluteParh = path.resolve(process.cwd(), filepath)
  const content = readFileSync(absoluteParh, 'utf-8')
  const format = getFormat(filepath)
  if (format === 'json') {
    return JSON.parse(content)
  }
}

export default parseFile;
