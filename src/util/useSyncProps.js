import { useEffect } from 'react'
import useComponentWillMount from './useComponentWillMount'

const useSyncProps = props => {
  console.log('useSyncProps', props)
  const defaultProps = Object.entries(props).filter(
    ([name, value]) => name.startsWith('default') && value !== undefined
  )
}

export default useSyncProps
