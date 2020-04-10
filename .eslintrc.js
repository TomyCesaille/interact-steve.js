module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "eslint:recommended"
  ],
  rules: {},
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "semi": "error",
    "no-undef": "off"
  }
}
