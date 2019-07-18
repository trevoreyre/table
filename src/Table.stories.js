import React from 'react'
import { storiesOf } from '@storybook/react'
import Table from './Table'

const users = [
  { name: 'Trevor', age: 98 },
  { name: 'John', age: 43 },
  { name: 'Karen', age: 76 },
]

storiesOf('Table', module)
  .add('default', () => (
    <Table>
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
      </Table.Body>
    </Table>
  ))
  .add('sorting', () => (
    <Table data={users}>
      <Table.Header>
        <Table.Row>
          <Table.Cell sortBy="name">Name</Table.Cell>
          <Table.Cell sortBy="age">Age</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users => users.map(user => (
          <Table.Row>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.age}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ))
