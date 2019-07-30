import React, { useContext } from 'react'
import { TableContext } from './Context'
import PageButton from './PageButton'

// <  1   2   3   4   5   6   7   >

// < _1_  2   3   4   5  ...  8   >
// <  1  _2_  3   4   5  ...  8   >
// <  1   2  _3_  4   5  ...  8   >
// <  1   2   3  _4_  5  ...  8   >
// <  1  ...  4  _5_  6   7   8   >
// <  1  ...  4   5  _6_  7   8   >
// <  1  ...  4   5   6  _7_  8   >
// <  1  ...  4   5   6   7  _8_  >

// < _1_  2   3   4   5  ...  9   >
// <  1  _2_  3   4   5  ...  9   >
// <  1   2  _3_  4   5  ...  9   >
// <  1   2   3  _4_  5  ...  9   >
// <  1  ...  4  _5_  6  ...  9   >
// <  1  ...  5  _6_  7   8   9   >
// <  1  ...  5   6  _7_  8   9   >
// <  1  ...  5   6   7  _8_  9   >
// <  1  ...  5   6   7   8  _9_  >
const Pages = props => {
  const { page, totalPages } = props

  let firstPage, lastPage
  if (page <= 4) {
    firstPage = 2
    lastPage = Math.min(5, totalPages - 1)
    if (lastPage === totalPages - 2) lastPage = totalPages - 1
  } else if (page >= totalPages - 3) {
    firstPage = Math.max(2, totalPages - 4)
    if (firstPage === 3) firstPage = 2
    lastPage = totalPages - 1
  } else {
    firstPage = page - 1
    lastPage = page + 1
  }

  return (
    <>
      <PageButton value={1}>{page === 1 ? <strong>1</strong> : 1}</PageButton>
      {firstPage > 2 && <PageButton>...</PageButton>}
      {Array.from(
        { length: lastPage - firstPage + 1 },
        (_, i) => i + firstPage
      ).map(value => (
        <PageButton key={value} value={value}>
          {page === value ? <strong>{value}</strong> : value}
        </PageButton>
      ))}
      {lastPage < totalPages - 1 && <PageButton>...</PageButton>}
      <PageButton value={totalPages}>
        {page === totalPages ? <strong>{totalPages}</strong> : totalPages}
      </PageButton>
    </>
  )
}

const Pagination = props => {
  const ctx = useContext(TableContext)
  const { as: As = 'div', children, ...other } = props

  return (
    <As {...other}>
      {children === undefined ? (
        <>
          <PageButton value="prev">{'<'}</PageButton>
          <Pages page={ctx.page} totalPages={ctx.totalPages} />
          <PageButton value="next">{'>'}</PageButton>
        </>
      ) : typeof children === 'function' ? (
        children({
          page: ctx.page,
          perPage: ctx.perPage,
          totalPages: ctx.totalPages,
        })
      ) : (
        children
      )}
    </As>
  )
}

export default Pagination
