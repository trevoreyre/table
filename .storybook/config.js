import { addParameters, configure } from '@storybook/react'

addParameters({
  options: {
    showPanel: false
  }
})

const loadStories = () => {
  require('../src/Table.stories.js')
}

configure(loadStories, module)
