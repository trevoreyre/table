import { addDecorator, addParameters, configure } from '@storybook/react'
import { withStyles } from 'storybook-addon-styles/react'

addDecorator(withStyles)
addParameters({
  styles: {
    padding: '40px 24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
  }
})

const loadStories = () => {
  require('../src/Table.stories.js')
}

configure(loadStories, module)
