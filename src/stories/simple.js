import React from 'react'
import Table from '../index'

export default {
  title: 'Basic|Simple',
}

export const Simple = () => (
  <Table.Table>
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
  </Table.Table>
)
