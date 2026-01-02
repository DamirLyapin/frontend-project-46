// @ts-check

import { expect, test } from '@jest/globals'
import parseFile from '../src/parsers.js'

test('parseFile', () => {
  const result1 = parseFile('../frontend-project-46/__fixtures__/file1.json')
  const expected1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  }
  expect(result1).toEqual(expected1)
  const result2 = parseFile('../frontend-project-46/__fixtures__/file1.json')
  const expected2 = {
    follow: false,
    host: 'hexlet.io',
    proxy: '123.234.53.22',
    timeout: 50,
  }
  expect(result2).toEqual(expected2)
  const nestedResult = parseFile('../frontend-project-46/__fixtures__/file1Recurs.json')
  const nestedExpected = {
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        key: 'value',
        doge: {
          wow: '',
        },
      },
    },
    group1: {
      baz: 'bas',
      foo: 'bar',
      nest: {
        key: 'value',
      },
    },
    group2: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  }
  expect(nestedResult).toEqual(nestedExpected)
})
