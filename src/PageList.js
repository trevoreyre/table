import React, { useContext } from 'react'
import { TableContext } from './Context'
import PageButton from './PageButton'

const Ellipses = () => (
  <span
    style={{
      display: 'inline-block',
      width: '40px',
      textAlign: 'center',
    }}
  >
    ...
  </span>
)

// <  1   2   3   4   5   6   7  >

// pages = 7, totalPages = 8
// < _1_  2   3   4   5  ...  8  >
// <  1  _2_  3   4   5  ...  8  >
// <  1   2  _3_  4   5  ...  8  >
// <  1   2   3  _4_  5  ...  8  >
// <  1  ...  4  _5_  6   7   8  >
// <  1  ...  4   5  _6_  7   8  >
// <  1  ...  4   5   6  _7_  8  >
// <  1  ...  4   5   6   7  _8_ >

// pages = 7, totalPages = 9
// < _1_  2   3   4   5  ...  9  >
// <  1  _2_  3   4   5  ...  9  >
// <  1   2  _3_  4   5  ...  9  >
// <  1   2   3  _4_  5  ...  9  >
// <  1  ...  4  _5_  6  ...  9  >
// <  1  ...  5  _6_  7   8   9  >
// <  1  ...  5   6  _7_  8   9  >
// <  1  ...  5   6   7  _8_  9  >
// <  1  ...  5   6   7   8  _9_ >

// pages = 9, totalPages = 10
// < _1_  2   3   4   5   6   7  ...  10  >
// <  1  _2_  3   4   5   6   7  ...  10  >
// <  1   2  _3_  4   5   6   7  ...  10  >
// <  1   2   3  _4_  5   6   7  ...  10  >
// <  1   2   3   4  _5_  6   7  ...  10  >
// <  1  ...  4   5  _6_  7   8   9   10  >
// <  1  ...  4   5   6  _7_  8   9   10  >
// <  1  ...  4   5   6   7  _8_  9   10  >
// <  1  ...  4   5   6   7   8  _9_  10  >
// <  1  ...  4   5   6   7   8   9  _10_ >

// pages = 9, totalPages = 11
// < _1_  2   3   4   5   6   7  ...  11  >
// <  1  _2_  3   4   5   6   7  ...  11  >
// <  1   2  _3_  4   5   6   7  ...  11  >
// <  1   2   3  _4_  5   6   7  ...  11  >
// <  1   2   3   4  _5_  6   7  ...  11  >
// <  1  ...  4   5  _6_  7   8  ...  11  >
// <  1  ...  5   6  _7_  8   9   10  11  >
// <  1  ...  5   6   7  _8_  9   10  11  >
// <  1  ...  5   6   7   8  _9_  10  11  >
// <  1  ...  5   6   7   8   9  _10_ 11  >
// <  1  ...  5   6   7   8   9   10 _11_ >
const getFirstLastPage = ({ page, pages, totalPages }) => {
  const middlePage = Math.ceil(pages / 2)

  // Show entire range if fewer pages than pages in list
  if (totalPages <= pages) {
    return { firstPage: 2, lastPage: totalPages - 1 }
  }

  // Beginning of list
  if (page <= middlePage) {
    return { firstPage: 2, lastPage: pages - 2 }
  }

  // End of list
  if (page >= totalPages - middlePage + 1) {
    return { firstPage: totalPages - pages + 3, lastPage: totalPages - 1 }
  }

  // Middle of list. Find the range of pages between ellipses.
  // Add one page on right if showing even number of pages.
  const offset = Math.floor((pages - 5) / 2)
  return {
    firstPage: page - offset,
    lastPage: pages % 2 === 1 ? page + offset : page + offset + 1,
  }
}

const PageList = props => {
  const { page, totalPages } = useContext(TableContext)
  const { as, pages = 7, ...other } = props

  const { firstPage, lastPage } = getFirstLastPage({
    page,
    pages,
    totalPages,
  })

  return totalPages === 1 ? null : (
    <>
      <PageButton as={as} value={1} {...other}>
        {page === 1 ? <strong>1</strong> : 1}
      </PageButton>
      {firstPage > 2 && <Ellipses />}
      {Array.from(
        { length: lastPage - firstPage + 1 },
        (_, i) => i + firstPage
      ).map(value => (
        <PageButton key={value} as={as} value={value} {...other}>
          {page === value ? <strong>{value}</strong> : value}
        </PageButton>
      ))}
      {lastPage < totalPages - 1 && <Ellipses />}
      <PageButton as={as} value={totalPages} {...other}>
        {page === totalPages ? <strong>{totalPages}</strong> : totalPages}
      </PageButton>
    </>
  )
}

export default PageList
