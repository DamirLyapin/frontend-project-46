// @ts-check

import { expect, test, describe } from '@jest/globals'
import { plain } from '../formatters/plain.js'

describe('Plain formatter', () => {
  test('should format simple addition', () => {
    const diff = [
      {
        key: 'foo',
        type: 'added',
        value: 'bar',
      },
    ]

    const result = plain(diff)
    expect(result).toBe('Property \'foo\' was added with value: \'bar\'')
  })

  test('should format removal', () => {
    const diff = [
      {
        key: 'foo',
        type: 'removed',
        value: 'bar',
      },
    ]

    const result = plain(diff)
    expect(result).toBe('Property \'foo\' was removed')
  })

  test('should format update', () => {
    const diff = [
      {
        key: 'foo',
        type: 'changed',
        value1: 'bar',
        value2: 'baz',
      },
    ]

    const result = plain(diff)
    expect(result).toBe('Property \'foo\' was updated. From \'bar\' to \'baz\'')
  })

  test('should format nested changes', () => {
    const diff = [
      {
        key: 'common',
        type: 'nested',
        children: [
          {
            key: 'follow',
            type: 'added',
            value: false,
          },
        ],
      },
    ]

    const result = plain(diff)
    expect(result).toBe('Property \'common.follow\' was added with value: false')
  })

  test('should handle complex values', () => {
    const diff = [
      {
        key: 'nested',
        type: 'added',
        value: { foo: 'bar' },
      },
    ]

    const result = plain(diff)
    expect(result).toBe('Property \'nested\' was added with value: [complex value]')
  })
})
