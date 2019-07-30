import Body from './Body'
import Cell from './Cell'
import Footer from './Footer'
import Header from './Header'
import PageButton from './PageButton'
import PageList from './PageList'
import Pagination from './Pagination'
import Provider from './Provider'
import Row from './Row'
import Search from './Search'
import SortIcon from './SortIcon'
import Table from './Table'

const Components = {
  Body,
  Cell,
  Footer,
  Header,
  PageButton,
  PageList,
  Pagination,
  Provider,
  Row,
  Search,
  SortIcon,
  Table,
}

const T = {
  Body,
  D: Cell,
  Foot: Footer,
  H: Cell,
  Head: Header,
  PageButton,
  PageList,
  Pagination,
  Provider,
  R: Row,
  Search,
  SortIcon,
  Table,
}

export default Components
export {
  T,
  // Component names
  Body as TableBody,
  Cell as TableCell,
  Footer as TableFooter,
  Header as TableHeader,
  PageButton as TablePageButton,
  PageList as TablePageList,
  Pagination as TablePagination,
  Provider as TableProvider,
  Row as TableRow,
  Search as TableSearch,
  SortIcon as TableSortIcon,
  Table,
  // HTML names
  Body as TBody,
  Cell as TD,
  Footer as TFoot,
  Cell as TH,
  Header as THead,
  PageButton as TPageButton,
  PageList as TPageList,
  Pagination as TPagination,
  Provider as TProvider,
  Row as TR,
  Search as TSearch,
  SortIcon as TSortIcon,
}
