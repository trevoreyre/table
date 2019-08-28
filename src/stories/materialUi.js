import React from 'react'
import {
  IconButton as MuiIconButton,
  OutlinedInput as MuiInput,
  Select as MuiSelect,
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
} from '@material-ui/core'
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from '@material-ui/icons'
import Table from '../index'
import users from './users.json'

export default {
  title: 'Styling|material-ui',
}

export const MaterialUi = () => (
  <Table.Provider>
    <Table.Search
      as={MuiInput}
      placeholder="Search"
      style={{ width: '300px', marginBottom: '16px' }}
      margin="dense"
    />
    <Table.Table as={MuiTable}>
      <Table.Header as={MuiTableHead}>
        <Table.Row as={MuiTableRow}>
          <Table.HeadCell as={MuiTableCell} sortBy="name">
            Name
          </Table.HeadCell>
          <Table.HeadCell as={MuiTableCell} sortBy="email">
            Email
          </Table.HeadCell>
          <Table.HeadCell as={MuiTableCell} sortBy="ipAddress">
            IP Address
          </Table.HeadCell>
        </Table.Row>
      </Table.Header>
      <Table.Body as={MuiTableBody} data={users}>
        {users =>
          users.map(user => (
            <Table.Row key={user.id} as={MuiTableRow}>
              <Table.Cell as={MuiTableCell}>{user.name}</Table.Cell>
              <Table.Cell as={MuiTableCell}>{user.email}</Table.Cell>
              <Table.Cell as={MuiTableCell}>{user.ipAddress}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table.Table>
    <Table.Pagination style={{ marginTop: '24px' }}>
      {({ page, totalPages }) => (
        <>
          <span style={{ marginRight: '16px', fontSize: '14px' }}>
            Rows per page:
          </span>
          <Table.PerPage
            as={MuiSelect}
            defaultValue={10}
            native
            disableUnderline
            style={{ marginRight: '16px ', fontSize: '14px' }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </Table.PerPage>
          <span style={{ marginRight: '16px', fontSize: '14px' }}>
            {page} of {totalPages}
          </span>
          <Table.PageButton as={MuiIconButton} value="first">
            <FirstPage />
          </Table.PageButton>
          <Table.PageButton as={MuiIconButton} value="prev">
            <KeyboardArrowLeft />
          </Table.PageButton>
          <Table.PageButton as={MuiIconButton} value="next">
            <KeyboardArrowRight />
          </Table.PageButton>
          <Table.PageButton as={MuiIconButton} value="last">
            <LastPage />
          </Table.PageButton>
        </>
      )}
    </Table.Pagination>
  </Table.Provider>
)

MaterialUi.story = { name: 'material-ui' }
