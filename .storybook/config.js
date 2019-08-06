import { addDecorator, addParameters, configure } from '@storybook/react'
import { withStyles } from 'storybook-addon-styles/react'

addDecorator(withStyles)
addParameters({
  styles: {
    padding: '40px 24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
  }
})

configure(require.context('../src/stories', true, /\.js$/), module)
