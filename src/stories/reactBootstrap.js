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

export const reactBootstrap = () => (
  <Table.Provider data={users} perPage={10}>
    <Table.Search
      as={BSForm.Control}
      style={{ maxWidth: '300px', marginBottom: '24px' }}
      placeholder="Search"
    />
    <Table.Table as={BSTable} striped>
      <Table.Header>
        <Table.Row>
          <Table.Cell sortBy="name">Name</Table.Cell>
          <Table.Cell sortBy="email">Email</Table.Cell>
          <Table.Cell sortBy="ipAddress">IP Address</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
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
    <Table.Pagination as={BSPagination} style={{ marginTop: '24px' }}>
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

reactBootstrap.story = { name: 'react-bootstrap' }
