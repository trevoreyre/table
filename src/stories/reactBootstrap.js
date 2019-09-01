import React from 'react'
import {
  Pagination as BSPagination,
  Table as BSTable,
  Form as BSForm,
} from 'react-bootstrap'
import Table from '../index'
import users from './users.json'

export default {
  title: 'Styling|react-bootstrap',
}

const BSSortIcon = () => (
  <Table.SortIcon
    style={{ opacity: 0.4, marginLeft: '4px' }}
    inactiveIcon={<i className="fas fa-sort" />}
    ascIcon={<i className="fas fa-sort-up" />}
    descIcon={<i className="fas fa-sort-down" />}
  />
)

export const ReactBootstrap = () => (
  <Table.Provider>
    <Table.Search
      as={BSForm.Control}
      style={{ maxWidth: '300px', marginBottom: '24px' }}
      placeholder="Search"
    />
    <Table.Table as={BSTable} striped>
      <Table.Header>
        <Table.Row>
          <Table.HeadCell sortBy="name">
            Name <BSSortIcon />
          </Table.HeadCell>
          <Table.HeadCell sortBy="email">
            Email <BSSortIcon />
          </Table.HeadCell>
          <Table.HeadCell sortBy="ipAddress">
            IP Address <BSSortIcon />
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
    <Table.Pagination
      as={BSPagination}
      perPage={10}
      style={{ marginTop: '24px' }}
    >
      {({ page, pageList }) => (
        <>
          <Table.PageButton as={BSPagination.Prev} value="prev" />
          {pageList.map((value, i) =>
            value === '...' ? (
              <BSPagination.Ellipsis key={value + i} />
            ) : (
              <Table.PageButton
                key={value}
                as={BSPagination.Item}
                value={value}
                active={value === page}
              >
                {value}
              </Table.PageButton>
            )
          )}
          <Table.PageButton as={BSPagination.Next} value="next" />
        </>
      )}
    </Table.Pagination>
  </Table.Provider>
)

ReactBootstrap.story = { name: 'react-bootstrap' }
