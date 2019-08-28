import React from 'react'
import Table from '../index'
import users from './users.json'
import placeholder from './placeholder.png'

export default {
  title: 'Basic|Custom cell',
}

export const CustomCell = () => (
  <Table.Provider>
    <Table.Table>
      <Table.Header>
        <Table.Row>
          <Table.HeadCell />
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
              <Table.Cell>
                <img
                  src={user.avatar || placeholder}
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
    <Table.Pagination perPage={10} />
  </Table.Provider>
)

CustomCell.story = { name: 'Custom cell' }
