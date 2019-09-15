import React, { useMemo, useState } from 'react'
import fuzzysort from 'fuzzysort'
import Table from '../../index'
import users from '../users.json'

export default {
  title: 'Stories|Search',
}

export const Search = () => (
  <Table.Provider>
    <Table.Search placeholder="Search" aria-label="Search" />
    <Table.Container>
      <Table.Table>
        <Table.Header>
          <Table.Row>
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
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.ipAddress}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Table>
    </Table.Container>
  </Table.Provider>
)

export const CustomSearch = () => {
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

  const searchKeys = useMemo(() => ['name', 'email', 'ipAddress'], [])

  return (
    <Table.Provider>
      <Table.Search
        placeholder="Search"
        aria-label="Search"
        search={search}
        searchKeys={searchKeys}
      />
      <Table.Container>
        <Table.Table>
          <Table.Header>
            <Table.Row>
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
      </Table.Container>
    </Table.Provider>
  )
}
CustomSearch.story = { name: 'Custom search' }
