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
  ArrowDownward,
  ArrowUpward,
} from '@material-ui/icons'
import {
  Pagination as BSPagination,
  Table as BSTable,
  Form as BSForm,
} from 'react-bootstrap'
import Table from '../../index'
import users from '../users.json'

export default {
  title: 'Stories|Styling',
}

const MuiTableSortIcon = () => (
  <Table.SortIcon
    inactiveIcon={<ArrowUpward style={{ width: '18px', height: '18px' }} />}
    ascIcon={<ArrowUpward style={{ width: '18px', height: '18px' }} />}
    descIcon={<ArrowDownward style={{ width: '18px', height: '18px' }} />}
  />
)

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
            Name <MuiTableSortIcon />
          </Table.HeadCell>
          <Table.HeadCell as={MuiTableCell} sortBy="email">
            Email <MuiTableSortIcon />
          </Table.HeadCell>
          <Table.HeadCell as={MuiTableCell} sortBy="ipAddress">
            IP Address <MuiTableSortIcon />
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
