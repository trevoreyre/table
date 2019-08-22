import { useEffect } from 'react'
import { useTableDispatch } from '../Context'
import useComponentWillMount from './useComponentWillMount'

const useInitializeProps = defaultProps => {
  console.log('useInitializeProps', defaultProps)
  const dispatch = useTableDispatch()

  // const defaultProps = Object.entries(props)
  //   .filter(([key, value]) => value !== undefined)
  //   .reduce((defaultProps, [key, value]) => {
  //     defaultProps[key] = value
  //     return defaultProps
  //   }, {})
  // console.log('defaultProps:', defaultProps)

  useComponentWillMount(() => {
    dispatch({ type: 'syncDefaultProps', defaultProps })
  })
}

export default useInitializeProps
