// @ts-check

import { expect, test } from '@jest/globals'
import { genDiff } from '../src/index.js'
import parseFile from '../src/parsers.js'

test('parseFile', () => {
    const result1 = parseFile('../frontend-project-46/__fixtures__/file1.json')
    const expected1 = {
        "host": "hexlet.io",
        "timeout": 50,
        "proxy": "123.234.53.22",
        "follow": false
    }
    expect(result1).toEqual(expected1)
    const result2 = parseFile('../frontend-project-46/__fixtures__/file1.json')
    const expected2 = {}
    expect(result2).toEqual(expected2)
})

test('genDiff', () => {
    const file1 = {
        "id": 101,
        "name": "Alexey",
        "city": "Kazan",
        "status": "Inactive",
        "tags": ["frontend", "react"],
        "lastSeen": "2025-12-11T14:30:00Z"
    }
    const file2 = {
        "id": 101,
        "name": "Alexey",
        "city": "Kazan",
        "status": "Active",
        "isAdmin": true,
        "tags": ["frontend", "javascript"]
    }
    const result = genDiff(file1, file2)
    const expected = `{
        city: Kazan
        id: 101
        + isAdmin: true
        - lastSeen: 2025-12-11T14:30:00Z
        name: Alexey
        - status: Inactive
        + status: Active
        - tags: ["frontend", "react"]
        + tags: ["frontend", "javascript"]
    }`
    expect(result).toBe(expected)
    const file3 = {
        "id": 101,
        "name": "Alexey",
        "city": "Kazan",
        "status": "Inactive",
        "tags": ["frontend", "react"],
        "lastSeen": "2025-12-11T14:30:00Z"
    }
    const file4 = {}
    const result2 = genDiff(file3, file4)
    const expected2 = `{
    }`
    expect(result2).toBe(expected)
})