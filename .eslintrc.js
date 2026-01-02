module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true, // Добавляем поддержку Jest
    node: true, // Добавляем поддержку Node.js
  },
  extends: [
    'airbnb-base',
    'prettier', // Если используешь Prettier
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Базовые правила
    'no-console': 'off', // Разрешаем console.log (можно изменить на 'warn')
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    }], // Игнорировать переменные, начинающиеся с _

    // Правила импорта
    'import/extensions': ['error', 'ignorePackages', {
      js: 'always',
      json: 'always',
    }],
    'import/prefer-default-export': 'off', // Разрешаем именованные экспорты

    // Правила для функций
    'func-names': ['error', 'as-needed'],
    'arrow-body-style': ['error', 'as-needed'],

    // Правила для массивов/объектов
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'prefer-destructuring': ['error', {
      array: false,
      object: true,
    }],

    // Правила для строк
    'quotes': ['error', 'single', { avoidEscape: true }],
    'template-curly-spacing': ['error', 'never'],

    // Дополнительные удобные правила
    'no-underscore-dangle': ['error', { allow: ['_id'] }], // Разрешаем _id для MongoDB
    'consistent-return': 'warn',
    'no-param-reassign': ['error', { props: false }], // Разрешаем изменять свойства параметров

    // Правила для тестов (если нужно)
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',
  },
  // Настройки для разрешения модулей
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  // Игнорируем определенные файлы/папки
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    '*.min.js',
    '*.config.js',
    '**/*.d.ts',
  ],
}
