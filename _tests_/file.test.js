// @ts-check

import { expect, test } from '@jest/globals'
import { stylish } from '../src/formaters.js'
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
    const nestedResult = parseFile('../frontend-project-46/__fixtures__/file1Recurs.json')
    const nestedExpected = {
    "common": {
        "setting1": "Value 1",
        "setting2": 200,
        "setting3": true,
        "setting6": {
        "key": "value",
        "doge": {
            "wow": ""
        }
        }
    },
    "group1": {
        "baz": "bas",
        "foo": "bar",
        "nest": {
        "key": "value"
        }
    },
    "group2": {
        "abc": 12345,
        "deep": {
        "id": 45
        }
    }
    }
    expect(nestedResult).toEqual(nestedExpected)
})

test('stylish', () => {
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
    const diff1 = genDiff(file1, file2)
    const result1 = stylish(diff1)
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
    expect(result1).toBe(expected)
    const file3 = {
        "id": 101,
        "name": "Alexey",
        "city": "Kazan",
        "status": "Inactive",
        "tags": ["frontend", "react"],
        "lastSeen": "2025-12-11T14:30:00Z"
    }
    const file4 = {}
    const diff2 = genDiff(file3, file4)
    const result2 = stylish(diff2)
    const expected2 = `{
    }`
    expect(result2).toBe(expected)
    const nestedFile1 = parseFile('../frontend-project-46/__fixtures__/file1Recurs.json')
    const nestedFile2 = parseFile('../frontend-project-46/__fixtures__/file2Recurs.json')
    const nestedResult = stylish(nestedFile1, nestedFile2)
    const nestedExpect = `{
        common: {
        + follow: false
            setting1: Value 1
        - setting2: 200
        - setting3: true
        + setting3: null
        + setting4: blah blah
        + setting5: {
                key5: value5
            }
            setting6: {
                doge: {
                - wow:
                + wow: so much
                }
                key: value
            + ops: vops
            }
        }
        group1: {
        - baz: bas
        + baz: bars
            foo: bar
        - nest: {
                key: value
            }
        + nest: str
        }
    - group2: {
            abc: 12345
            deep: {
                id: 45
            }
        }
    + group3: {
            deep: {
                id: {
                    number: 45
                }
            }
            fee: 100500
        }
    }`
    expect(nestedResult).toEqual(nestedExpect)
})

test('plain', () => {
    const nestedFile1 = parseFile('../frontend-project-46/__fixtures__/file1Recurs.json')
    const nestedFile2 = parseFile('../frontend-project-46/__fixtures__/file2Recurs.json')
    const nestedResult = stylish(nestedFile1, nestedFile2)
    const expected = ``
})