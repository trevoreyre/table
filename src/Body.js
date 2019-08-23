import React from 'react'
import { useSyncProps } from './util'
import { LevelContext, useTableData } from './Context'

const Body = props => {
  const { as: As = 'tbody', children, data, ...other } = props
  const tableData = useTableData({ paginated: true })

  useSyncProps({ data }, [data])

  console.log('Body.render')

  return (
    <LevelContext.Provider value="body">
      <As {...other}>
        {typeof children !== 'function'
          ? children
          : tableData
          ? children(tableData)
          : null}
      </As>
    </LevelContext.Provider>
  )
}

export default Body
