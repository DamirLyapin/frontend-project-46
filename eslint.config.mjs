import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'space-infix-ops': 'error',
      'keyword-spacing': 'error',
      'brace-style': 'error',
      'padded-blocks': ['error', 'never'],
      'no-multiple-empty-lines': 'error',
    },
  },
])
