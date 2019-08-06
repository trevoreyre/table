const path = require('path')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.js$/,
    include: [path.resolve(__dirname, '..', 'src', 'stories')],
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre'
  })
  return config
}
