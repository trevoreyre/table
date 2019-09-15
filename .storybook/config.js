import { addDecorator, addParameters, configure } from '@storybook/react'
import { withConsole } from '@storybook/addon-console'
import { withStyles } from 'storybook-addon-styles/react'
import '../src/style.css'
import '../src/docs/style.css'

addDecorator((story, context) => withConsole()(story)(context))
addDecorator(withStyles)
addParameters({
  styles: {
    padding: '40px 24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
  },
})

configure(() => [
  require(`../src/docs/getting-started/installation.stories.mdx`),
  require(`../src/docs/getting-started/usage.stories.mdx`),
  require(`../src/docs/examples/basic.stories.mdx`),
  require(`../src/docs/examples/accessibility.stories.mdx`),
  require('../src/docs/stories/basic.stories.js'),
  require('../src/docs/stories/pagination.stories.js'),
  require('../src/docs/stories/sorting.stories.js'),
  require('../src/docs/stories/search.stories.js'),
  require('../src/docs/stories/actions.stories.js'),
  require('../src/docs/stories/selectable.stories'),
  require('../src/docs/stories/styling.stories'),
], module)
