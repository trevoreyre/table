import { configure } from '@storybook/react'

const loadStories = () => {
  require('../src/Table.stories.js')
}

configure(loadStories, module)
