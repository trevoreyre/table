import React from 'react'
import PropTypes from 'prop-types'
import { useSyncProps } from './util'
import { LevelContext, useTableData } from './Context'

const Body = props => {
  const {
    as: As = 'tbody',
    children,
    data,
    hover,
    selected,
    striped,
    ...other
  } = props
  const tableData = useTableData({ paginated: true })

  useSyncProps({ data, selected }, [data, selected])

  const dataAttributes = {
    ...(hover && { 'data-table-hover': true }),
    ...(striped && { 'data-table-striped': true }),
  }

  console.log('Body.render')

  return (
    <LevelContext.Provider value="body">
      <As data-table-body {...dataAttributes} {...other}>
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
  striped: PropTypes.bool,
}

export default Body
