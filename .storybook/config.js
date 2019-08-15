import { addDecorator, addParameters, configure } from '@storybook/react'
import { withConsole } from '@storybook/addon-console'
import { withStyles } from 'storybook-addon-styles/react'

addDecorator((story, context) => withConsole()(story)(context))
addDecorator(withStyles)
addParameters({
  styles: {
    padding: '40px 24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
  }
})

configure(require.context('../src/stories', true, /\.js$/), module)
