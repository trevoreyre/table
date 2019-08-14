import React, { useState } from 'react'
import fuzzysort from 'fuzzysort'
import Table from '../index'
import users from './users.json'

export default {
  title: 'Basic|Search',
}

export const search = () => (
  <Table.Provider data={users}>
    <Table.Search placeholder="Search" />
    <Table.Table>
      <Table.Header>
        <Table.Row>
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

export const customSearch = () => {
  const [searchResults, setSearchResults] = useState([])

  const search = ({ searchValue, searchKeys, data }) => {
    if (searchValue) {
      const results = fuzzysort.go(searchValue, data, { keys: searchKeys })
      setSearchResults(results)
      return results.map(result => result.obj)
    } else {
      setSearchResults([])
      return data
    }
  }

  return (
    <Table.Provider
      data={users}
      search={search}
      searchKeys={['name', 'email', 'ipAddress']}
    >
      <Table.Search placeholder="Search" />
      <Table.Table>
        <Table.Header>
          <Table.Row>
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
            users.map((user, i) => (
              <Table.Row key={user.id}>
                <Table.Cell>
                  {searchResults[i] && searchResults[i][0] ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: fuzzysort.highlight(searchResults[i][0]),
                      }}
                    />
                  ) : (
                    user.name
                  )}
                </Table.Cell>
                <Table.Cell>
                  {searchResults[i] && searchResults[i][1] ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: fuzzysort.highlight(searchResults[i][1]),
                      }}
                    />
                  ) : (
                    user.email
                  )}
                </Table.Cell>
                <Table.Cell>
                  {searchResults[i] && searchResults[i][2] ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: fuzzysort.highlight(searchResults[i][2]),
                      }}
                    />
                  ) : (
                    user.ipAddress
                  )}
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Table>
    </Table.Provider>
  )
}
customSearch.story = { name: 'custom search' }
