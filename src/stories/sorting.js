import React from 'react'
import Table from '../index'
import users from './users.json'

export default {
  title: 'Basic|Sorting',
}

export const Sorting = () => (
  <Table.Provider data={users}>
    <Table.Table>
      <Table.Header>
        <Table.Row>
          <Table.Cell sortBy="name">
            Name <Table.SortIcon />
          </Table.Cell>
          <Table.Cell sortBy="email">
            Email <Table.SortIcon />
          </Table.Cell>
          <Table.Cell sortBy="age">
            Age <Table.SortIcon />
          </Table.Cell>
          <Table.Cell sortBy="ipAddress">
            IP Address <Table.SortIcon />
          </Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users =>
          users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.age}</Table.Cell>
              <Table.Cell>{user.ipAddress}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table.Table>
  </Table.Provider>
)
