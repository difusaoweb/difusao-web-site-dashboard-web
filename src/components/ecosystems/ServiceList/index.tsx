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

import {
  ServiceData,
  useAppSelector,
  reduxServicesGetServiceListFunction,
  reduxServicesDeleteServiceListFunction,
  useAppDispatch
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
  console.log('table reload')
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
  id: keyof ServiceData
  label: string
  numeric?: boolean
  noShort?: true
}
const headCells: readonly HeadCell[] = [
  {
    id: 'image',
    label: 'Imagem',
    noShort: true
  },
  {
    id: 'title',
    label: 'Título'
  },
  {
    id: 'description',
    label: 'Descrição'
  },
  {
    id: 'created_at',
    label: 'Data'
  }
]

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ServiceData
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
    (property: keyof ServiceData) => (event: React.MouseEvent<unknown>) => {
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
  handleReloadTable(): void
  handleDeleteAllSelectedRows(): void
}
const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const {
    loading,
    numSelected,
    handleReloadTable,
    handleDeleteAllSelectedRows
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
          Serviços
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => handleDeleteAllSelectedRows()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Recarregar lista">
          {loading ? (
            <CircularProgress size={24} sx={{ margin: 1 }} />
          ) : (
            <IconButton onClick={handleReloadTable}>
              <ReplayIcon />
            </IconButton>
          )}
        </Tooltip>
      )}
    </Toolbar>
  )
}

export const ServiceList = () => {
  const {
    getServiceListServices,
    getServiceListTotal,
    deleteServiceListDeleted
  } = useAppSelector(state => state.services)
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const [isOnGetServiceList, setIsOnGetServiceList] = React.useState(true)
  const [isLoadingGetServiceList, setIsLoadingGetServiceList] =
    React.useState(false)
  const [isLoadingDeleteServiceList, setIsLoadingDeleteServiceList] =
    React.useState(false)
  const [rows, setRows] = React.useState<ServiceData[] | null>(null)
  const [order, setOrder] = React.useState<Order>('desc')
  const [orderBy, setOrderBy] = React.useState<keyof ServiceData>('created_at')
  const [selecteds, setSelecteds] = React.useState<number[] | null>(null)
  const [selectedsDestroy, setSelectedsDestroy] = React.useState<
    number[] | null
  >(null)
  const [pageQuery, setPageQuery] = React.useState(1)
  const [pageRows, setPageRows] = React.useState(0)
  const [perPageRows, setPerPageRows] = React.useState(3)
  const [rowCellAnchorEl, setRowCellAnchorEl] = React.useState<any | null>(null)
  const [countRows, setCountRows] = React.useState(0)

  const rowCellOpen = Boolean(rowCellAnchorEl)
  const emptyRows =
    pageRows > 0
      ? Math.max(0, (1 + pageRows) * perPageRows - (rows?.length ?? 0))
      : 0

  function isSelected(id: number) {
    if (selecteds) {
      return selecteds.indexOf(id) !== -1
    }
    return false
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ServiceData
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

  function handleReloadTable() {
    setPageQuery(1)
    setPageRows(0)
    setSelecteds(null)
    setIsOnGetServiceList(true)
  }

  function handleDeleteAllSelectedRows() {
    console.log('handleDeleteAllSelectedRows')

    setSelectedsDestroy(selecteds)
    setSelecteds(null)
    handleRowMenuClose()
  }

  function handleRowCheckbox(id: number) {
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

  function handleRowToggleMenu(index, event) {
    setRowCellAnchorEl({ [index]: event.currentTarget })
    setSelecteds(null)
  }

  function handleRowMenuClose() {
    setRowCellAnchorEl(null)
  }

  function handleRowMenuDelete(id: number) {
    console.log('handleRowMenuDelete')

    setSelectedsDestroy([id])
    handleRowMenuClose()
  }

  function handleRowMenuEdit(id: number) {
    handleRowMenuClose()
    console.log('handleRowMenuEdit')
    console.log(id)
  }

  function handleChangePage(thePage: number) {
    setPageRows(thePage)
    if (thePage === pageQuery) {
      setPageQuery(page => page + 1)
      setIsOnGetServiceList(true)
    }
    setSelecteds(null)
  }

  function handleChangeRowsPerPage(thePerPage: number) {
    setPerPageRows(thePerPage)
    setPageRows(0)
    setPageQuery(1)
  }

  async function onGetServiceList() {
    console.log('onGetServiceList')
    if (isLoadingGetServiceList) return
    setIsOnGetServiceList(false)

    setIsLoadingGetServiceList(true)
    await dispatch(
      reduxServicesGetServiceListFunction({
        page: pageQuery,
        perPage: perPageRows
      })
    )
    setIsLoadingGetServiceList(false)
  }

  async function onDeleteServiceList() {
    if (isLoadingDeleteServiceList || !selectedsDestroy) return

    setIsLoadingDeleteServiceList(true)
    await dispatch(
      reduxServicesDeleteServiceListFunction({ servicesId: selectedsDestroy })
    )
    setIsLoadingDeleteServiceList(false)
  }

  console.log('renderizou')
  console.log(rows)

  React.useEffect(() => {
    if (isOnGetServiceList) {
      onGetServiceList()
    }
  }, [isOnGetServiceList])

  React.useEffect(() => {
    if (getServiceListServices) {
      setRows(getServiceListServices)
    }
    setCountRows(getServiceListTotal ?? 0)
  }, [getServiceListServices])

  React.useEffect(() => {
    if (selectedsDestroy) {
      onDeleteServiceList()
    }
  }, [selectedsDestroy])
  React.useEffect(() => {
    if (deleteServiceListDeleted) {
      if (!rows || !selectedsDestroy) return

      setRows(
        rows.filter(
          row => selectedsDestroy.filter(id => id === row.id).length < 1
        )
      )
      setCountRows(count => count - selectedsDestroy.length)
      setSelectedsDestroy(null)
    }
  }, [deleteServiceListDeleted])

  return (
    <>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selecteds?.length ?? 0}
          loading={isLoadingGetServiceList || isLoadingDeleteServiceList}
          handleReloadTable={handleReloadTable}
          handleDeleteAllSelectedRows={handleDeleteAllSelectedRows}
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
                  .slice(
                    pageRows * perPageRows,
                    pageRows * perPageRows +
                      (perPageRows === -1 ? countRows : perPageRows)
                  )
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
                            onClick={() => handleRowCheckbox(row.id)}
                            disabled={
                              isLoadingGetServiceList ||
                              isLoadingDeleteServiceList
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Avatar
                            alt={row.title}
                            src={row.image}
                            variant="rounded"
                            sx={{ width: 100, height: 100 }}
                          />
                        </TableCell>
                        <TableCell align="left">{row.title}</TableCell>
                        <TableCell align="left">{row.description}</TableCell>
                        <TableCell align="left">{rowDateTimeString}</TableCell>
                        <TableCell>
                          <IconButton
                            id="rowCellBasicButton"
                            aria-controls={
                              rowCellOpen ? 'rowCellBasicMenu' : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={rowCellOpen ? 'true' : undefined}
                            onClick={e => handleRowToggleMenu(index, e)}
                            disabled={
                              isLoadingGetServiceList ||
                              isLoadingDeleteServiceList
                            }
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            id="rowCellBasicMenu"
                            anchorEl={rowCellAnchorEl && rowCellAnchorEl[index]}
                            open={Boolean(
                              rowCellAnchorEl && rowCellAnchorEl[index]
                            )}
                            onClose={handleRowMenuClose}
                            MenuListProps={{
                              'aria-labelledby': 'rowCellBasicButton'
                            }}
                          >
                            <MenuItem
                              onClick={() => handleRowMenuDelete(row.id)}
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
                            <MenuItem onClick={() => handleRowMenuEdit(row.id)}>
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
          rowsPerPageOptions={[10, 3, 100, { value: -1, label: 'Todos' }]}
          component="div"
          page={pageRows}
          rowsPerPage={perPageRows}
          count={countRows}
          onPageChange={(e, page) => handleChangePage(page)}
          onRowsPerPageChange={e =>
            handleChangeRowsPerPage(Number(e.target.value))
          }
        />
      </Paper>
    </>
  )
}
