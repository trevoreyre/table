import Body from './Body'
import Cell from './Cell'
import Checkbox from './Checkbox'
import Footer from './Footer'
import Header from './Header'
import PageButton from './PageButton'
import PageInput from './PageInput'
import Pagination from './Pagination'
import PerPage from './PerPage'
import Provider from './Provider'
import Row from './Row'
import Search from './Search'
import SortIcon from './SortIcon'
import Table from './Table'

const Components = {
  Body,
  Cell,
  Checkbox,
  Footer,
  Header,
  PageButton,
  PageInput,
  Pagination,
  PerPage,
  Provider,
  Row,
  Search,
  SortIcon,
  Table,
}

const T = {
  Body,
  Checkbox,
  D: Cell,
  Foot: Footer,
  H: Cell,
  Head: Header,
  PageButton,
  PageInput,
  Pagination,
  PerPage,
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
  Checkbox as TableCheckbox,
  Footer as TableFooter,
  Header as TableHeader,
  PageButton as TablePageButton,
  PageInput as TablePageInput,
  Pagination as TablePagination,
  PerPage as TablePerPage,
  Provider as TableProvider,
  Row as TableRow,
  Search as TableSearch,
  SortIcon as TableSortIcon,
  Table,
  // HTML names
  Body as TBody,
  Checkbox as TCheckbox,
  Cell as TD,
  Footer as TFoot,
  Cell as TH,
  Header as THead,
  PageButton as TPageButton,
  PageInput as TPageInput,
  Pagination as TPagination,
  PerPage as TPerPage,
  Provider as TProvider,
  Row as TR,
  Search as TSearch,
  SortIcon as TSortIcon,
}
