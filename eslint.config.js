import globals from 'globals'
import js from '@eslint/js'
import jsdocPlugin from 'eslint-plugin-jsdoc'
import mochaPlugin from 'eslint-plugin-mocha'
import noLodashPlugin from 'eslint-plugin-you-dont-need-lodash-underscore'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import promisePlugin from 'eslint-plugin-promise'
import securityPlugin from 'eslint-plugin-security'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import unicornPlugin from 'eslint-plugin-unicorn'

export default [
  js.configs.recommended,
  jsdocPlugin.configs['flat/recommended-typescript-error'],
  unicornPlugin.configs['flat/recommended'],

  // All JavaScript and TypeScript files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node },
    },
    plugins: {
      prettier: prettierPlugin,
      promise: promisePlugin,
      security: securityPlugin,
      'you-dont-need-lodash-underscore': noLodashPlugin,
    },
    rules: {
      ...securityPlugin.configs.recommended.rules,
      ...noLodashPlugin.configs['all-warn'].rules,
      'prettier/prettier': 'error',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/filename-case': ['error', { cases: { camelCase: true, pascalCase: true } }],
      'unicorn/no-negated-condition': 'off',
      'security/detect-object-injection': 'off',
    },
  },

  // Setup for TypeScript only
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { modules: true },
        ecmaVersion: 'latest',
        project: './tsconfig.eslint.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs['strict-type-checked'].rules,
      ...tsPlugin.configs['stylistic-type-checked'].rules,
    },
  },

  // Setup for test files only
  {
    files: ['**/*.{spec,test}.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.mocha,
        expect: 'readonly',
        assert: 'readonly',
        should: 'readonly',
      },
    },
    plugins: {
      mocha: mochaPlugin,
    },
    rules: {
      ...mochaPlugin.configs.recommended.rules,
    },
  },

  {
    ignores: ['node_modules/**', 'dist/**', 'config/**', 'coverage/**', 'scripts/**', 'patches/**'],
  },

  // Prettier config overrides all other configs
  prettierConfig,
]
