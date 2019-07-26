import React from 'react'
import { storiesOf } from '@storybook/react'
import BootstrapTable from 'react-bootstrap/Table'
import users from './MOCK_DATA.json'
import Table from './Table'

storiesOf('Table', module)
  .add('default', () => (
    <Table as={BootstrapTable} striped>
      <Table.Header>
        <Table.Row>
          <Table.Cell>Header 1</Table.Cell>
          <Table.Cell>Header 2</Table.Cell>
          <Table.Cell>Header 3</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Cell 1</Table.Cell>
          <Table.Cell>Cell 2</Table.Cell>
          <Table.Cell>Cell 3</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell 1</Table.Cell>
          <Table.Cell>Cell 2</Table.Cell>
          <Table.Cell>Cell 3</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ))
  .add('sorting', () => (
    <Table.Provider data={users}>
      <Table as={BootstrapTable} striped>
        <Table.Header>
          <Table.Row>
            <Table.Cell sortBy="name">Name</Table.Cell>
            <Table.Cell sortBy="email">Email</Table.Cell>
            <Table.Cell sortBy="ipAddress">IP Address</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users => users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.ipAddress}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.Provider>
  ))
  .add('search', () => (
    <Table.Provider data={users}>
      <Table.Search />
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Cell sortBy="name">Name</Table.Cell>
            <Table.Cell sortBy="email">Email</Table.Cell>
            <Table.Cell sortBy="ipAddress">IP Address</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users => users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.ipAddress}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.Provider>
  ))
  .add('selectable', () => (
    <Table />
  ))
  .add('custom cell', () => (
    <Table.Provider data={users}>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Cell />
            <Table.Cell sortBy="name">Name</Table.Cell>
            <Table.Cell sortBy="email">Email</Table.Cell>
            <Table.Cell sortBy="ipAddress">IP Address</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users => users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <img src={user.avatar} alt="Profile picture" width="80" height="80" />
              </Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.ipAddress}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.Provider>
  ))
