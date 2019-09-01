import React from 'react'
import PropTypes from 'prop-types'
import { useSyncProps } from './util'
import { LevelContext, useTableData } from './Context'

const Body = props => {
  const { as: As = 'tbody', children, data, selected, ...other } = props
  const tableData = useTableData({ paginated: true })

  useSyncProps({ data, selected }, [data, selected])

  console.log('Body.render')

  return (
    <LevelContext.Provider value="body">
      <As data-table-body {...other}>
        {typeof children !== 'function'
          ? children
          : tableData
          ? children(tableData)
          : null}
      </As>
    </LevelContext.Provider>
  )
}

Body.propTypes = {
  as: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  data: PropTypes.any,
  hover: PropTypes.bool,
  selected: PropTypes.array,
}

export default Body
