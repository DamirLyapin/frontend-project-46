// @ts-check

import { expect, test, describe } from '@jest/globals'
import { stylish } from '../formatters/stylish.js'

describe('Stylish formatter', () => {
  test('should format simple addition', () => {
    const diff = [
      {
        key: 'foo',
        type: 'added',
        value: 'bar',
      },
    ]

    const result = stylish(diff)
    const expected = `{
  + foo: bar
}`
    expect(result).toBe(expected)
  })

  test('should format simple removal', () => {
    const diff = [
      {
        key: 'foo',
        type: 'removed',
        value: 'bar',
      },
    ]

    const result = stylish(diff)
    const expected = `{
  - foo: bar
}`
    expect(result).toBe(expected)
  })

  test('should format unchanged value', () => {
    const diff = [
      {
        key: 'foo',
        type: 'unchanged',
        value: 'bar',
      },
    ]

    const result = stylish(diff)
    const expected = `{
    foo: bar
}`
    expect(result).toBe(expected)
  })

  test('should format changed value', () => {
    const diff = [
      {
        key: 'foo',
        type: 'changed',
        value1: 'old',
        value2: 'new',
      },
    ]

    const result = stylish(diff)
    const expected = `{
  - foo: old
  + foo: new
}`
    expect(result).toBe(expected)
  })

  test('should format nested objects', () => {
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
          {
            key: 'setting1',
            type: 'unchanged',
            value: 'Value 1',
          },
        ],
      },
    ]

    const result = stylish(diff)
    const expected = `{
    common: {
      + follow: false
        setting1: Value 1
    }
}`
    expect(result).toBe(expected)
  })

  test('should format with multiple nested levels', () => {
    const diff = [
      {
        key: 'level1',
        type: 'nested',
        children: [
          {
            key: 'level2',
            type: 'nested',
            children: [
              {
                key: 'level3',
                type: 'added',
                value: 'deep value',
              },
            ],
          },
        ],
      },
    ]

    const result = stylish(diff)
    const expected = `{
    level1: {
        level2: {
          + level3: deep value
        }
    }
}`
    expect(result).toBe(expected)
  })

  test('should format object values', () => {
    const diff = [
      {
        key: 'config',
        type: 'added',
        value: { key1: 'value1', key2: 'value2' },
      },
    ]

    const result = stylish(diff)
    const expected = `{
  + config: {
        key1: value1
        key2: value2
    }
}`
    expect(result).toBe(expected)
  })

  test('should format numbers and booleans', () => {
    const diff = [
      {
        key: 'count',
        type: 'added',
        value: 42,
      },
      {
        key: 'active',
        type: 'changed',
        value1: true,
        value2: false,
      },
    ]

    const result = stylish(diff)
    const expected = `{
  + count: 42
  - active: true
  + active: false
}`
    expect(result).toBe(expected)
  })

  test('should format null values', () => {
    const diff = [
      {
        key: 'value',
        type: 'changed',
        value1: 'something',
        value2: null,
      },
    ]

    const result = stylish(diff)
    const expected = `{
  - value: something
  + value: null
}`
    expect(result).toBe(expected)
  })

  test('should format empty string', () => {
    const diff = [
      {
        key: 'empty',
        type: 'changed',
        value1: '',
        value2: 'not empty',
      },
    ]

    const result = stylish(diff)
    const expected = `{
  - empty: 
  + empty: not empty
}`
    expect(result).toBe(expected)
  })

  test('should format complex example from assignment', () => {
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
          {
            key: 'setting1',
            type: 'unchanged',
            value: 'Value 1',
          },
          {
            key: 'setting2',
            type: 'removed',
            value: 200,
          },
          {
            key: 'setting3',
            type: 'changed',
            value1: true,
            value2: null,
          },
          {
            key: 'setting4',
            type: 'added',
            value: 'blah blah',
          },
          {
            key: 'setting5',
            type: 'added',
            value: { key5: 'value5' },
          },
          {
            key: 'setting6',
            type: 'nested',
            children: [
              {
                key: 'doge',
                type: 'nested',
                children: [
                  {
                    key: 'wow',
                    type: 'changed',
                    value1: '',
                    value2: 'so much',
                  },
                ],
              },
              {
                key: 'key',
                type: 'unchanged',
                value: 'value',
              },
              {
                key: 'ops',
                type: 'added',
                value: 'vops',
              },
            ],
          },
        ],
      },
      {
        key: 'group1',
        type: 'nested',
        children: [
          {
            key: 'baz',
            type: 'changed',
            value1: 'bas',
            value2: 'bars',
          },
          {
            key: 'foo',
            type: 'unchanged',
            value: 'bar',
          },
          {
            key: 'nest',
            type: 'changed',
            value1: { key: 'value' },
            value2: 'str',
          },
        ],
      },
      {
        key: 'group2',
        type: 'removed',
        value: {
          abc: 12345,
          deep: {
            id: 45,
          },
        },
      },
      {
        key: 'group3',
        type: 'added',
        value: {
          deep: {
            id: {
              number: 45,
            },
          },
          fee: 100500,
        },
      },
    ]

    const result = stylish(diff)

    // Проверяем ключевые элементы вывода
    expect(result).toContain('+ follow: false')
    expect(result).toContain('- setting2: 200')
    expect(result).toContain('- setting3: true')
    expect(result).toContain('+ setting3: null')
    expect(result).toContain('+ setting4: blah blah')
    expect(result).toContain('+ setting5: {')
    expect(result).toContain('key5: value5')
    expect(result).toContain('- wow: ')
    expect(result).toContain('+ wow: so much')
    expect(result).toContain('+ ops: vops')
    expect(result).toContain('- baz: bas')
    expect(result).toContain('+ baz: bars')
    expect(result).toContain('- nest: {')
    expect(result).toContain('+ nest: str')
    expect(result).toContain('- group2: {')
    expect(result).toContain('abc: 12345')
    expect(result).toContain('+ group3: {')
    expect(result).toContain('fee: 100500')

    // Проверяем правильность вложенности
    expect(result).toContain('    doge: {')
    expect(result).toContain('      - wow: ')
    expect(result).toContain('      + wow: so much')
  })

  test('should handle arrays as values', () => {
    const diff = [
      {
        key: 'items',
        type: 'added',
        value: [1, 2, 3], // В stylish формате массивы обычно форматируются как строки
      },
    ]

    const result = stylish(diff)
    // Поскольку ваша текущая реализация использует String(value),
    // массив будет преобразован в строку "1,2,3"
    expect(result).toContain('+ items: 1,2,3')
  })
})
