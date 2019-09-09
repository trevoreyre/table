import { addDecorator, addParameters, configure } from '@storybook/react'
import { withConsole } from '@storybook/addon-console'
import { withStyles } from 'storybook-addon-styles/react'
import '../src/style.css'

addDecorator((story, context) => withConsole()(story)(context))
addDecorator(withStyles)
addParameters({
  styles: {
    padding: '40px 24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
  },
})

const loadStories = () => {
  const reqStories = require.context('../src/docs/stories/', true, /\.stories\.(js|mdx)$/)
  const stories = reqStories.keys().map(fileName => reqStories(fileName))

  return [
    require(`../src/docs/getting-started/installation.stories.mdx`),
    require(`../src/docs/getting-started/usage.stories.mdx`),
    require(`../src/docs/examples/basic.stories.mdx`),
    ...stories
  ]
}

configure(loadStories, module)
