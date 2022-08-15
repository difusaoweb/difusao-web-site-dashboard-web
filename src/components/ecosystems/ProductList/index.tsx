import * as React from 'react'
import { alpha, useTheme } from '@mui/material/styles'
import {
  Replay as ReplayIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material'
import { visuallyHidden } from '@mui/utils'
import { DateTime } from 'luxon'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TablePagination,
  TableSortLabel,
  Toolbar,
  TableHead,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Avatar
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import {
  deleteProducts,
  ProductData,
  getProducts,
  RootState
} from '../../../redux'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: typeof Key },
  b: { [key in Key]: typeof Key }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

interface HeadCell {
  id: keyof ProductData
  label: string
  numeric: boolean
  noShort?: true
}

const headCells: readonly HeadCell[] = [
  {
    id: 'image',
    numeric: false,
    label: 'Imagem',
    noShort: true
  },
  {
    id: 'name',
    numeric: false,
    label: 'Nome'
  },
  {
    id: 'sku',
    numeric: true,
    label: 'SKU'
  },
  {
    id: 'stock',
    numeric: false,
    label: 'Stock'
  },
  {
    id: 'price',
    numeric: true,
    label: 'Price'
  },
  {
    id: 'category',
    numeric: false,
    label: 'Categoria'
  },
  {
    id: 'created_at',
    numeric: false,
    label: 'Data'
  }
]

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ProductData
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props
  const createSortHandler =
    (property: keyof ProductData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.noShort ? (
              headCell.label
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  )
}

interface EnhancedTableToolbarProps {
  loading: boolean
  numSelected: number
  onGetProducts(): void
  handleRowCellDelete(ids: number[]): void
  selecteds: number[]
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const {
    loading,
    numSelected,
    onGetProducts,
    handleRowCellDelete,
    selecteds
  } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selecionados
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Produtos
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => handleRowCellDelete(selecteds)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Recarregar lista">
          {loading ? (
            <CircularProgress size={24} sx={{ margin: 1 }} />
          ) : (
            <IconButton onClick={onGetProducts}>
              <ReplayIcon />
            </IconButton>
          )}
        </Tooltip>
      )}
    </Toolbar>
  )
}

export function ProductList() {
  const theme = useTheme()
  const { productsList, deletedProducts } = useSelector(
    (state: ReturnType<RootState>) => state.products
  )
  const dispatch = useDispatch()

  const [loadingGetProducts, setLoadingGetProducts] = React.useState(false)
  const [loadingDeleteProducts, setLoadingDeleteProducts] =
    React.useState(false)
  const [rows, setRows] = React.useState<ProductData[] | null>(null)
  const [order, setOrder] = React.useState<Order>('desc')
  const [orderBy, setOrderBy] = React.useState<keyof ProductData>('created_at')
  const [selecteds, setSelecteds] = React.useState<number[] | null>(null)
  const [selectedsDestroy, setSelectedsDestroy] = React.useState<
    number[] | null
  >(null)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(50)

  const [rowCellAnchorEl, setRowCellAnchorEl] = React.useState<any | null>(null)
  const rowCellOpen = Boolean(rowCellAnchorEl)

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ProductData
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      if (rows) {
        const newSelecteds = rows.map(row => row.id)
        setSelecteds(newSelecteds)
      }
      return
    }
    setSelecteds(null)
  }

  function handleRowCellCheckbox(id: number) {
    if (selecteds) {
      const selectedIndex = selecteds.indexOf(id)
      let newSelecteds: number[] = []

      if (selectedIndex === -1) {
        newSelecteds = newSelecteds.concat(selecteds, id)
      } else if (selectedIndex === 0) {
        newSelecteds = newSelecteds.concat(selecteds.slice(1))
      } else if (selectedIndex === selecteds.length - 1) {
        newSelecteds = newSelecteds.concat(selecteds.slice(0, -1))
      } else if (selectedIndex > 0) {
        newSelecteds = newSelecteds.concat(
          selecteds.slice(0, selectedIndex),
          selecteds.slice(selectedIndex + 1)
        )
      }
      setSelecteds(newSelecteds)
    } else {
      setSelecteds([id])
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  function isSelected(id: number) {
    if (selecteds) {
      return selecteds.indexOf(id) !== -1
    }
    return false
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (rows?.length ?? 0)) : 0

  function handleRowCellClick(index, event) {
    setRowCellAnchorEl({ [index]: event.currentTarget })
    setSelecteds(null)
  }
  function handleRowCellClose() {
    setRowCellAnchorEl(null)
  }

  async function handleRowCellDelete(ids: number[]) {
    if (loadingDeleteProducts) {
      return
    }

    handleRowCellClose()
    setSelecteds(null)
    setSelectedsDestroy(ids)
    console.log('handleRowCellDelete')
    console.log(ids)

    setLoadingDeleteProducts(true)
    await dispatch(deleteProducts(ids))
    setLoadingDeleteProducts(false)
  }

  function handleRowCellEdit(id: number) {
    handleRowCellClose()
    console.log('handleRowCellEdit')
    console.log(id)
  }

  async function onGetProducts() {
    if (loadingGetProducts) {
      return
    }
    setSelecteds(null)

    setLoadingGetProducts(true)
    await dispatch(getProducts())
    setLoadingGetProducts(false)
  }

  React.useEffect(() => {
    onGetProducts()
  }, [])

  React.useEffect(() => {
    if (productsList) {
      setRows(productsList)
    }
  }, [productsList])

  React.useEffect(() => {
    if (deletedProducts) {
      if (!!rows && !!selectedsDestroy) {
        setRows(
          rows.filter(
            row => selectedsDestroy.filter(id => id === row.id).length < 1
          )
        )
        setSelectedsDestroy(null)
      }
    }
  }, [deletedProducts])

  return (
    <>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selecteds?.length ?? 0}
          loading={loadingGetProducts}
          onGetProducts={onGetProducts}
          handleRowCellDelete={handleRowCellDelete}
          selecteds={selecteds ?? []}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selecteds?.length ?? 0}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length ?? 0}
            />
            {rows && (
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id)
                    const labelId = `enhanced-table-checkbox-${index}`

                    const rowDateTimeString = DateTime.fromISO(
                      row.created_at
                    ).toFormat('dd/MM/yyyy HH:mm')

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId
                            }}
                            onClick={() => handleRowCellCheckbox(row.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Avatar
                            alt={row.name}
                            src={row.image}
                            variant="rounded"
                            sx={{ width: 100, height: 100 }}
                          />
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.sku}</TableCell>
                        <TableCell align="left">
                          {row.stock ? 'Em estoque' : 'Em falta'}
                        </TableCell>
                        <TableCell align="left">{row.price}</TableCell>
                        <TableCell align="left">{row.category}</TableCell>
                        <TableCell align="left">{rowDateTimeString}</TableCell>
                        <TableCell>
                          <IconButton
                            id="rowCellBasicButton"
                            aria-controls={
                              rowCellOpen ? 'rowCellBasicMenu' : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={rowCellOpen ? 'true' : undefined}
                            onClick={e => handleRowCellClick(index, e)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            id="rowCellBasicMenu"
                            anchorEl={rowCellAnchorEl && rowCellAnchorEl[index]}
                            open={Boolean(
                              rowCellAnchorEl && rowCellAnchorEl[index]
                            )}
                            onClose={handleRowCellClose}
                            MenuListProps={{
                              'aria-labelledby': 'rowCellBasicButton'
                            }}
                          >
                            <MenuItem
                              onClick={() => handleRowCellDelete([row.id])}
                            >
                              <ListItemIcon>
                                <DeleteIcon
                                  fontSize="small"
                                  sx={{ color: theme.palette.error.main }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                sx={{ color: theme.palette.error.main }}
                              >
                                Deletar
                              </ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => handleRowCellEdit(row.id)}>
                              <ListItemIcon>
                                <EditIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText>Editar</ListItemText>
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 50, 100, { value: -1, label: 'Todos' }]}
          component="div"
          count={rows?.length ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}
