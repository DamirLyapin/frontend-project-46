import { readFileSync } from 'fs'
import path from 'path'
import { load } from 'js-yaml'

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
  if ((format === 'yaml') || (format === 'yml')) {
    return load(content)
  }
}

export default parseFile