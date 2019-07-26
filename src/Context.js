import { createContext } from 'react'

const TableContext = createContext()
const LevelContext = createContext('body')
const SortContext = createContext({ active: false, direction: 'asc' })

export { TableContext, LevelContext, SortContext }
