/* @flow */

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
    mocha: true,
    es6: true,
    browser: true,
  },
  plugins: [
    'flowtype',
    'react',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  rules: {
    semi: 'warn',
    quotes: ['warn', 'single', {
      "avoidEscape": true,
      "allowTemplateLiterals": true,
    }],
    'no-console': ['error', {allow: ['warn', 'error', 'info']}],
    'max-len': ['warn', 140],
    'no-var': 'error',
    'no-eval': 'error',
    'eqeqeq': 'error',
    'no-loop-func': 'error',
    'indent': ['warn', 2, {
      'SwitchCase': 1,
    }],
    'comma-dangle': ['warn', 'always-multiline'],
    'eol-last': 'error',
    'no-param-reassign': 'error',
    'linebreak-style': ['error', 'unix'],
  },
};
