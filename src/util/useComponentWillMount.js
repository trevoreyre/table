import { useState, useEffect } from 'react'

const useComponentWillMount = callback => {
  const [willMount, setWillMount] = useState(true)
  useEffect(() => setWillMount(false), [])
  if (willMount) {
    callback()
  }
}

export default useComponentWillMount
