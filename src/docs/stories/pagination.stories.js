import React, { useState } from 'react'
import Table from '../../index'
import users from '../users.json'

export default {
  title: 'Stories|Pagination',
}

export const Pagination = () => (
  <Table.Provider>
    <Table.Search placeholder="Search" aria-label="Search" />
    <Table.Container>
      <Table.Table>
        <Table.Header>
          <Table.Row>
            <Table.HeadCell sortBy="name">
              Name <Table.SortIcon />
            </Table.HeadCell>
            <Table.HeadCell sortBy="email">
              Email <Table.SortIcon />
            </Table.HeadCell>
            <Table.HeadCell sortBy="ipAddress">
              IP Address <Table.SortIcon />
            </Table.HeadCell>
          </Table.Row>
        </Table.Header>
        <Table.Body data={users}>
          {users =>
            users.map(user => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.ipAddress}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Table>
    </Table.Container>
    <Table.Pagination perPage={10} />
  </Table.Provider>
)

export const PerPageSelect = () => (
  <Table.Provider>
    <Table.Search placeholder="Search" aria-label="Search" />
    <Table.Container>
      <Table.Table>
        <Table.Header>
          <Table.Row>
            <Table.HeadCell sortBy="name">
              Name <Table.SortIcon />
            </Table.HeadCell>
            <Table.HeadCell sortBy="email">
              Email <Table.SortIcon />
            </Table.HeadCell>
            <Table.HeadCell sortBy="ipAddress">
              IP Address <Table.SortIcon />
            </Table.HeadCell>
          </Table.Row>
        </Table.Header>
        <Table.Body data={users}>
          {users =>
            users.map(user => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.ipAddress}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Table>
    </Table.Container>
    <div className="toolbar">
      <Table.Pagination as="span" />
      <label htmlFor="per-page" className="ml-m mr-s">
        Per page
      </label>
      <Table.PerPage id="per-page" defaultValue={10}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </Table.PerPage>
    </div>
  </Table.Provider>
)
PerPageSelect.story = { name: 'Per page select' }

export const DefaultPage = () => (
  <Table.Provider>
    <Table.Search placeholder="Search" aria-label="Search" />
    <Table.Container>
      <Table.Table>
        <Table.Header>
          <Table.Row>
            <Table.HeadCell sortBy="name">
              Name <Table.SortIcon />
            </Table.HeadCell>
            <Table.HeadCell sortBy="email">
              Email <Table.SortIcon />
            </Table.HeadCell>
            <Table.HeadCell sortBy="ipAddress">
              IP Address <Table.SortIcon />
            </Table.HeadCell>
          </Table.Row>
        </Table.Header>
        <Table.Body data={users}>
          {users =>
            users.map(user => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.ipAddress}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Table>
    </Table.Container>
    <Table.Pagination perPage={10} defaultPage={11} />
  </Table.Provider>
)
DefaultPage.story = { name: 'Default page' }

export const Controlled = () => {
  const [page, setPage] = useState(11)

  const handleChangePage = newPage => setPage(newPage)

  const handleChange = event => setPage(parseInt(event.target.value, 10))

  return (
    <>
      <label htmlFor="page-input" className="ml-m mr-s">
        Page
      </label>
      <Table.Input
        id="page-input"
        type="number"
        value={page || ''}
        onChange={handleChange}
      />
      <Table.Provider>
        <Table.Container>
          <Table.Table>
            <Table.Header>
              <Table.Row>
                <Table.HeadCell sortBy="name">
                  Name <Table.SortIcon />
                </Table.HeadCell>
                <Table.HeadCell sortBy="email">
                  Email <Table.SortIcon />
                </Table.HeadCell>
                <Table.HeadCell sortBy="ipAddress">
                  IP Address <Table.SortIcon />
                </Table.HeadCell>
              </Table.Row>
            </Table.Header>
            <Table.Body data={users}>
              {users =>
                users.map(user => (
                  <Table.Row key={user.id}>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.ipAddress}</Table.Cell>
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table.Table>
        </Table.Container>
        <Table.Pagination
          perPage={10}
          page={page || 1}
          onChange={handleChangePage}
        />
      </Table.Provider>
    </>
  )
}

export const CustomPagination = () => (
  <Table.Provider>
    <Table.Search placeholder="Search" aria-label="Search" />
    <Table.Container>
      <Table.Table>
        <Table.Header>
          <Table.Row>
            <Table.HeadCell sortBy="name">
              Name <Table.SortIcon />
            </Table.HeadCell>
            <Table.HeadCell sortBy="email">
              Email <Table.SortIcon />
            </Table.HeadCell>
            <Table.HeadCell sortBy="ipAddress">
              IP Address <Table.SortIcon />
            </Table.HeadCell>
          </Table.Row>
        </Table.Header>
        <Table.Body data={users}>
          {users =>
            users.map(user => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.ipAddress}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Table>
    </Table.Container>
    <div className="toolbar end">
      <label htmlFor="per-page" className="mr-s">
        Per page
      </label>
      <Table.PerPage id="per-page" className="mr-l" defaultValue={10}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </Table.PerPage>
      <Table.Pagination>
        {({ page, totalPages }) => (
          <>
            <span className="mr-l">
              Page {page} of {totalPages}
            </span>
            <Table.PageButton value="first" aria-label="First page" />
            <Table.PageButton value="prev" aria-label="Previous page" />
            <Table.PageButton value="next" aria-label="Next page" />
            <Table.PageButton value="last" aria-label="Last page" />
          </>
        )}
      </Table.Pagination>
    </div>
  </Table.Provider>
)
CustomPagination.story = { name: 'Custom pagination' }
