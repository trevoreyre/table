import { useEffect } from 'react'
import { isEmpty, lowerFirst } from 'lodash/fp'
import { useTableState, useTableDispatch } from '../Context'

/* eslint-disable react-hooks/exhaustive-deps */
const useSyncProps = (props, dependencies) => {
  const state = useTableState()
  const dispatch = useTableDispatch()

  useEffect(() => {
    const propsToSync = Object.entries(props)
      .filter(([name, value]) => value !== undefined)
      .reduce((result, [name, value]) => {
        const prop = lowerFirst(name.replace('default', ''))
        if (name.startsWith('default')) {
          // Sync default props if not initialized or controlled
          if (!state[`${prop}Initialized`] && !result[prop]) {
            result[prop] = value
          }
        } else {
          // Sync controlled props
          result[prop] = value
          result[`${prop}IsControlled`] = true
        }
        result[`${prop}Initialized`] = true
        return result
      }, {})

    if (!isEmpty(propsToSync)) {
      dispatch({ type: 'syncProps', props: propsToSync })
    }
  }, dependencies)
}

export default useSyncProps
