module.exports = {
  extends: [
    'react-app',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'es5'
      }
    ]
  }
}
