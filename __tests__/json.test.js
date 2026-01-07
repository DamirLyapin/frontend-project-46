// @ts-check

import { expect, test, describe } from '@jest/globals'
import { json } from '../formatters/json.js'

describe('JSON formatter', () => {
  test('should format simple diff to JSON', () => {
    const diff = [
      {
        key: 'foo',
        type: 'added',
        value: 'bar',
      },
      {
        key: 'baz',
        type: 'removed',
        value: 42,
      },
    ]

    const result = json(diff)

    expect(() => JSON.parse(result)).not.toThrow()

    const parsed = JSON.parse(result)
    expect(Array.isArray(parsed)).toBe(true)
    expect(parsed).toHaveLength(2)
    expect(parsed[0]).toEqual({
      key: 'foo',
      type: 'added',
      value: 'bar',
    })
  })

  test('should format nested diff to JSON', () => {
    const diff = [
      {
        key: 'nested',
        type: 'nested',
        children: [
          {
            key: 'inner',
            type: 'changed',
            value1: 'old',
            value2: 'new',
          },
        ],
      },
    ]

    const result = json(diff)
    const parsed = JSON.parse(result)

    expect(parsed[0].type).toBe('nested')
    expect(Array.isArray(parsed[0].children)).toBe(true)
    expect(parsed[0].children[0].type).toBe('changed')
  })

  test('should format with pretty print (2 space indent)', () => {
    const diff = [
      {
        key: 'test',
        type: 'unchanged',
        value: 'value',
      },
    ]

    const result = json(diff)

    expect(result).toContain('\n')
  })
})
