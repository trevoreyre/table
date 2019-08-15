import React from 'react'
import Table from '../index'
import users from './users.json'

export default {
  title: 'Basic|Custom cell',
}

export const CustomCell = () => (
  <Table.Provider data={users}>
    <Table.Table>
      <Table.Header>
        <Table.Row>
          <Table.Cell />
          <Table.Cell sortBy="name">
            Name <Table.SortIcon />
          </Table.Cell>
          <Table.Cell sortBy="email">
            Email <Table.SortIcon />
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
              <Table.Cell>
                <img
                  src={user.avatar}
                  alt="User profile"
                  width="80"
                  height="80"
                />
              </Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.ipAddress}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table.Table>
  </Table.Provider>
)

CustomCell.story = { name: 'custom cell' }
