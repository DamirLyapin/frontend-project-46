// @ts-check

import { expect, test } from '@jest/globals'
import { genDiff } from '../src/index.js'
import parseFile from '../src/parsers.js'


test ('parseFile', () => {
    const result1 = parseFile('../frontend-project-46/__fixtures__/file1.yml')
    const expect1 = {
        id: 101,
        name: 'Alexey',
        city: 'Kazan',
        status: 'Inactive',
        tags: [ 'frontend', 'react' ],
        lastSeen: '2025-12-11T14:30:00Z'
    }
    expect(result1).toEqual(expect1)
})
